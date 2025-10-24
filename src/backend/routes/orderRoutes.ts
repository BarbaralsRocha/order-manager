import { Hono } from 'hono';
import * as orderController from '../controllers/orderController';

const ordersRoutes = new Hono();

/**
 * Criação de um novo pedido
 * @route POST /order
 * Edge Case: Se o cliente ou produto não existir, retornar erro 400
 * Edge Case: Se o pedido for criado com sucesso, retornar o pedido criado com status 201
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */

ordersRoutes.post('/order', orderController.createOrder);

/**
 * Listagem de todos os pedidos
 * @route GET /orders
 * Edge Case: Se não houver pedidos, retornar uma lista vazia com status 200
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
ordersRoutes.get('/orders', orderController.getAllOrders);

/**
 * Obter um pedido por ID
 * @route GET /order/:id
 * Edge Case: Se o pedido não existir, retornar erro 404
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
ordersRoutes.get('/order/:id', orderController.getOrderById);

/**
 * Atualização de um pedido por ID
 * @route PUT /order/:id
 * Edge Case: Se o pedido não existir, retornar erro 404
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
ordersRoutes.put('/order/:id', orderController.updateOrder);

/**
 * Exclusão de um pedido por ID
 * @route DELETE /order/:id
 * Edge Case: Se o pedido não existir, retornar erro 404
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
ordersRoutes.delete('/order/:id', orderController.deleteOrder);

/**
 * Exportar pedidos para Excel
 * @route GET /orders/export
 * Edge Case: Se não houver pedidos para exportar, retornar erro 200 com a lista vazia
 * Edge Case: Se a exportação for bem-sucedida, retornar o arquivo Excel com status 200
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
ordersRoutes.get('/orders/export', orderController.exportOrdersToExcel);

/** Obter totais de produtos vendidos
 * @route GET /orders/totals
 * Edge Case: Se não houver pedidos, retornar uma lista vazia com status 200
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
ordersRoutes.get('/orders/totals', orderController.getProductTotals);

export default ordersRoutes;

// TODO: Exportar a lista de clientes no dia para Excel
// TODO: Exportar a lista de produtos no dia para Excel
// TODO: Se tiver somente uma unidade no produto selecionado, inserir automaticamente essa unidade no campo do pedido.
