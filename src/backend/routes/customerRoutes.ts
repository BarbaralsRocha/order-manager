import { Hono } from 'hono';
import * as customerController from '../controllers/customerController';

const customerRoutes = new Hono();

/**
 * Criar um novo cliente
 * @route POST /customer
 * Edge Case: Se os dados do cliente forem inválidos, retornar erro 400 (Validação do formulário)
 * Edge Case: Se o cliente já existir (mesmo CNPJ), retornar erro 409
 * Edge Case: Se o cliente for criado com sucesso, retornar o cliente criado com status 201
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
customerRoutes.post('/customer', customerController.createCustomer);

/**
 * Listagem de todos os clientes
 * @route GET /customers
 * Edge Case: Se não houver clientes, retornar uma lista vazia com status 200
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
customerRoutes.get('/customers', customerController.getAllCustomers);

/**
 * Atualizar um cliente por ID
 * @route PUT /customer/:id
 * Edge Case: Se o cliente não existir, retornar erro 404
 * Edge Case: Se os dados do cliente forem inválidos, retornar erro 400 (Validação do formulário)
 * Edge Case: Se o cliente for atualizado com sucesso, retornar o cliente atualizado com status 200
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
customerRoutes.put('/customer/:id', customerController.updateCustomer);

/**
 * Deletar um cliente por ID
 * @route DELETE /customer/:id
 * Edge Case: Se o cliente não existir, retornar erro 404
 * Edge Case: Se o cliente estiver associado a algum pedido, retornar erro 400 com mensagem explicativa
 * Edge Case: Se o cliente for deletado com sucesso, retornar status 204
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
customerRoutes.delete('/customer/:id', customerController.deleteCustomer);

export default customerRoutes;

// TODO: Adicionar paginação na listagem de clientes
// TODO: Adicionar filtro de busca por nome ou CPF/CNPJ do cliente
// TODO: Impressão da lista de clientes
