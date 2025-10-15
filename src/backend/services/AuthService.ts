import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SendMailService } from './SendMailService';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();
const RESET_TOKEN_EXPIRY = 1; // hours

interface TokenPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}

type JwtSecret = string | Buffer;

export class AuthService {
  private sendMailService: SendMailService;

  private readonly JWT_SECRET: string;

  private readonly TOKEN_EXPIRY: string;

  constructor() {
    this.sendMailService = new SendMailService();
    this.JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
    this.TOKEN_EXPIRY = '24h';
  }

  async validatePassword(password: string): Promise<string | null> {
    if (password.length < 3) {
      return 'Password must be at least 8 characters long';
    }
    if (password.length > 16) {
      return 'Password must be less than 16 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  }

  async validateEmail(email: string): Promise<string | null> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Invalid email format';
    }
    if (email.length > 255) {
      return 'Email is too long';
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error('Email not found');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error('Invalid password');
    }

    return this.generateToken(user);
  }

  private generateToken(user: { id: string; email: string }): string {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
      exp: Math.floor(Date.now() + 3600000) / 1000,
    };
    return jwt.sign(payload, this.JWT_SECRET);
  }

  async requestPasswordReset(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('Email not found');
    }

    const resetToken = uuidv4();
    const resetTokenExpiry = new Date(
      Date.now() + RESET_TOKEN_EXPIRY * 3600000,
    );

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken, resetTokenExpiry },
    });

    await this.sendMailService.sendPasswordResetEmail(email, resetToken);

    return true;
  }

  //   async resetPassword(token: string, newPassword: string) {
  //     const user = await prisma.user.findFirst({
  //       where: {
  //         resetToken: token,
  //         resetTokenExpiry: { gt: new Date() },
  //       },
  //     });

  //     if (!user) {
  //       throw new Error('Invalid or expired reset token');
  //     }

  //     const passwordError = await this.validatePassword(newPassword);
  //     if (passwordError) throw new Error(passwordError);

  //     const hashedPassword = await bcrypt.hash(newPassword, 12);

  //     await prisma.user.update({
  //       where: { id: user.id },
  //       data: {
  //         password: hashedPassword,
  //         resetToken: null,
  //         resetTokenExpiry: null,
  //       },
  //     });

  //     return this.generateToken({ id: user.id });
  //   }

  async validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as TokenPayload;

      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
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
}
