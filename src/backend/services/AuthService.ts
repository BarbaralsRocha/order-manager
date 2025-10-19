import { PrismaClient } from '@prisma/client';
import { JwksClient } from 'jwks-rsa';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

interface TokenPayload extends jwt.JwtPayload {
  sub: string;
  email: string;
  exp?: number;
  aud?: string;
  iss?: string;
}

export class AuthService {
  private readonly domain: string;

  private readonly audience: string;

  private readonly jwksClient: JwksClient;

  constructor() {
    this.domain = process.env.REACT_APP_AUTH0_DOMAIN || '';
    this.audience = process.env.REACT_APP_AUTH0_AUDIENCE || '';
    this.jwksClient = new JwksClient({
      jwksUri: `https://${this.domain}/.well-known/jwks.json`,
      cache: true,
      rateLimit: true,
    });
  }

  private async getSigningKey(kid: string): Promise<string> {
    const key = await this.jwksClient.getSigningKey(kid);
    return key.getPublicKey();
  }

  async validateToken(token: string) {
    try {
      // Decodifica o token sem verificar para obter o kid
      const decodedHeader = jwt.decode(token, { complete: true });
      if (
        !decodedHeader ||
        typeof decodedHeader === 'string' ||
        !decodedHeader.header.kid
      ) {
        throw new Error('Invalid token');
      }

      // Obtém a chave pública correspondente ao kid
      const signingKey = await this.getSigningKey(decodedHeader.header.kid);

      // Verifica o token com a chave pública
      const decoded = jwt.verify(token, signingKey, {
        audience: this.audience,
        issuer: `https://${this.domain}/`,
        algorithms: ['RS256'],
      }) as TokenPayload;

      // Verifica se o token está expirado
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp && decoded.exp < currentTime) {
        throw new Error('Token expired');
      }

      const user = await prisma.user.findUnique({
        where: {
          auth0Id: decoded.sub,
        },
        select: {
          id: true,
          email: true,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error('Token expired');
      }
      throw new Error('Invalid token');
    }
  }

  async findOrCreateUser(auth0User: { sub: string; email: string }) {
    let user = await prisma.user.findUnique({
      where: { auth0Id: auth0User.sub },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          auth0Id: auth0User.sub,
          email: auth0User.email,
        },
      });
    }

    return user;
  }
}
