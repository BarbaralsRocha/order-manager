import { Context, Next } from 'hono';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();

interface AuthContext extends Context {
  user?: {
    id: string;
    email: string;
  };
}

export async function authMiddleware(c: AuthContext, next: Next) {
  try {
    const authHeader = c.req.header('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
      c.status(401);
      return c.json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const user = await authService.validateToken(token);
    console.log('Authenticated user:', user);
    if (!user) {
      c.status(401);
      return c.json({ error: 'Invalid token' });
    }

    // Adiciona o usuário autenticado ao contexto
    c.set('user', user);

    await next();
  } catch (error) {
    c.status(401);
    return c.json({
      error: error instanceof Error ? error.message : 'Authentication failed',
    });
  }
}
