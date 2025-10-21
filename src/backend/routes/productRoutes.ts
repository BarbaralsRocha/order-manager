/* eslint-disable import/no-extraneous-dependencies */
import { Hono } from 'hono';
import * as productController from '../controllers/productController';

const productRoutes = new Hono();

productRoutes.get('/products', productController.listProducts);
productRoutes.post('/product', productController.createProduct);
productRoutes.put('/product/:id', productController.updateProduct);
productRoutes.delete('/products/:id', productController.deleteProduct);

export { productRoutes };
