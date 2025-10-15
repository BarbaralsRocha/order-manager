import { Hono } from 'hono';
import { AuthService } from '../services/AuthService';
import { z } from 'zod';

const authService = new AuthService();
const router = new Hono();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(16),
});

const registerSchema = loginSchema.extend({
  password: z
    .string()
    .min(8)
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// router.post('/register', async (c) => {
//   try {
//     const body = await c.req.json();
//     const { email, password } = registerSchema.parse(body);

//     const token = await authService.register(email, password);
//     return c.json({ token });
//   } catch (error) {
//     c.status(400);
//     return c.json({
//       error: error instanceof Error ? error.message : 'Invalid request',
//     });
//   }
// });

router.post('/login', async (c) => {
  console.log('entrou no login');
  try {
    const body = await c.req.json();
    const { email, password } = loginSchema.parse(body);

    const token = await authService.login(email, password);
    return c.json({ token });
  } catch (error) {
    c.status(401);
    return c.json({
      error: error instanceof Error ? error.message : 'Senha Incorreta',
    });
  }
});

router.post('/forgot-password', async (c) => {
  try {
    const { email } = await c.req.json();
    await authService.requestPasswordReset(email);
    return c.json({
      message:
        'If an account exists with this email, a reset link has been sent.',
    });
  } catch (error) {
    c.status(400);
    return c.json({
      error: error instanceof Error ? error.message : 'Invalid request',
    });
  }
});

// router.post('/reset-password', async (c) => {
//   try {
//     const { token, newPassword } = await c.req.json();
//     const authToken = await authService.resetPassword(token, newPassword);
//     return c.json({ token: authToken });
//   } catch (error) {
//     c.status(400);
//     return c.json({
//       error: error instanceof Error ? error.message : 'Invalid request',
//     });
//   }
// });

export { router as authRouter };
