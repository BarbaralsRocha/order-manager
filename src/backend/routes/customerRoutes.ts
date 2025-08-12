import { Hono } from 'hono';
import * as customerController from '../controllers/customerController';

const customerRoutes = new Hono();

customerRoutes.post('/customer', customerController.createCustomer);
customerRoutes.get('/customers', customerController.getAllCustomers);
customerRoutes.put('/customer/:id', customerController.updateCustomer);
customerRoutes.delete('/customer/:id', customerController.deleteCustomer);

export default customerRoutes;
