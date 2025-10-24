/* eslint-disable import/no-extraneous-dependencies */
import { Hono } from 'hono';
import * as productController from '../controllers/productController';

const productRoutes = new Hono();

/**
 * Listagem de todos os produtos
 * @route GET /products
 * Edge Case: Se não houver produtos, retornar uma lista vazia com status 200
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
productRoutes.get('/products', productController.listProducts);

/**
 * Criar um novo produto
 * @route POST /product
 * Edge Case: Se os dados do produto forem inválidos, retornar erro 400 (Validação do formulário)
 * Edge Case: Se o produto for criado com sucesso, retornar o produto criado com status 201
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 *
 */
productRoutes.post('/product', productController.createProduct);

/**
 * Atualizar um produto por ID
 * @route PUT /product/:id
 * Edge Case: Se o produto não existir, retornar erro 404
 * Edge Case: Se os dados do produto forem inválidos, retornar erro 400 (Validação do formulário)
 * Edge Case: Se o produto for atualizado com sucesso, retornar o produto atualizado com status 200
 * Edge Case: Atualizar o preço do produto em todos os pedidos a partir do período atualizado
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
productRoutes.put('/product/:id', productController.updateProduct);

/**
 * Deletar um produto por ID
 * @route DELETE /product/:id
 * Edge Case: Se o produto não existir, retornar erro 404
 * Edge Case: Se o produto estiver sendo usado em algum pedido, retornar erro 400 com mensagem explicativa
 * Edge Case: Se o produto for deletado com sucesso, retornar status 204
 * Edge Case: Se houver um erro no servidor, retornar erro 500
 */
productRoutes.delete('/product/:id', productController.deleteProduct);

export { productRoutes };

// TODO: Adicionar paginação na listagem de produtos
// TODO: Adicionar filtro de busca por nome ou código do produto
// TODO: Adicionar atualização de preço do produto em todos os pedidos a partir do período atualizado
