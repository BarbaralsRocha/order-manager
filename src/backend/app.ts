import { Hono } from 'hono';
import { productRoutes } from './routes/productRoutes';
import customerRoutes from './routes/customerRoutes';
import ordersRoutes from './routes/orderRoutes';
import { ContentfulStatusCode } from 'hono/utils/http-status';
import { authRouter } from './routes/authRoutes';
import { authMiddleware } from './middleware/authMiddleware';

const app = new Hono();

app.use('/api/*', async (c, next) => {
  c.res.headers.append('Access-Control-Allow-Origin', '*');
  c.res.headers.append(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  c.res.headers.append(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  );
  if (c.req.method === 'OPTIONS') {
    return c.text('', 204 as ContentfulStatusCode);
  }
  await next();
});

// Rota pública para autenticação
app.route('/api', authRouter);

// Rotas protegidas que requerem autenticação
app.use('/api/*', authMiddleware);
app.route('/api', productRoutes);
app.route('/api', customerRoutes);
app.route('/api', ordersRoutes);

export default app;
