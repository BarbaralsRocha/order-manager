import { Hono } from 'hono';
import { productRoutes } from './routes/productRoutes';
import customerRoutes from './routes/customerRoutes';
import ordersRoutes from './routes/orderRoutes';

const app = new Hono();

app.route('/api', productRoutes);
app.route('/api', customerRoutes);
app.route('/api', ordersRoutes);

export default app;
