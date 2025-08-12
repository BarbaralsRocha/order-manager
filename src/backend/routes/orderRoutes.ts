import { Hono } from 'hono';
import * as orderController from '../controllers/orderController';

const ordersRoutes = new Hono();

ordersRoutes.post('/order', orderController.createOrder);
ordersRoutes.get('/orders', orderController.getAllOrders);
ordersRoutes.get('/order/:id', orderController.getOrderById);
ordersRoutes.put('/order/:id', orderController.updateOrder);
ordersRoutes.delete('/order/:id', orderController.deleteOrder);
ordersRoutes.get('/orders/export', orderController.exportOrdersToExcel);
ordersRoutes.get('/orders/totals', orderController.getProductTotals);

export default ordersRoutes;
