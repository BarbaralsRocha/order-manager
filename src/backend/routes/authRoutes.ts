import { Hono } from 'hono';
import { AuthService } from '../services/AuthService';

const authService = new AuthService();
const router = new Hono();

// Rota para validar token e obter informações do usuário
router.get('/validate-token', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      c.status(401);
      return c.json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const user = await authService.validateToken(token);

    return c.json({ user });
  } catch (error) {
    c.status(401);
    return c.json({
      error: error instanceof Error ? error.message : 'Authentication failed',
    });
  }
});

// Rota para criar ou atualizar usuário após autenticação no Auth0
router.post('/auth0-callback', async (c) => {
  try {
    const { sub, email } = await c.req.json();
    const user = await authService.findOrCreateUser({ sub, email });
    return c.json({ user });
  } catch (error) {
    c.status(400);
    return c.json({
      error: error instanceof Error ? error.message : 'Invalid request',
    });
  }
});

export { router as authRouter };
