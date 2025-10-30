/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-extraneous-dependencies */
import * as productService from '../services/productService';
import { Context } from 'hono';
import {
  handleError,
  handleValidation,
  handleNotFound,
  ValidationFormCustomerError,
  ValidationFormProductError,
} from '../utils/handleErrors';
import validationSchemaProduct from '../schemas/validationSchemaProducts';
import { IProduct } from '../interfaces/Product.interface';

/**
 * Listagem de produtos com paginação e filtros
 */
export const listProducts = async (ctx: Context) => {
  try {
    const page = parseInt(ctx.req.query('page') || '1', 10);
    const limit = parseInt(ctx.req.query('limit') || '10', 10);
    const search = ctx.req.query('search') || '';

    if (page < 1) {
      return handleValidation(ctx, 'O número da página deve ser maior que 0');
    }

    const result = await productService.getAllProducts({
      page,
      limit,
      search,
    });

    return ctx.json({
      output: result.products,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    });
  } catch (error) {
    return handleError(ctx, error, 'Erro ao listar produtos');
  }
};

/**
 * Buscar produto por ID
 */
export const getProductById = async (ctx: Context) => {
  try {
    const id = ctx.req.param('id');
    const productId = parseInt(id, 10);

    if (isNaN(productId) || productId < 1) {
      return handleValidation(ctx, 'ID do produto inválido');
    }

    const product = await productService.getProductById(productId);

    if (!product) {
      return handleNotFound(ctx, 'Produto', productId);
    }

    return ctx.json({ output: product });
  } catch (error) {
    return handleError(ctx, error, 'Erro ao buscar produto');
  }
};

/**
 * Criar novo produto
 */
export const createProduct = async (c: Context) => {
  try {
    const body = await c.req.json();
    const {
      name,
      additionalInformation,
      type,
      unityPrice,
      unitaryWeight,
      weightPrice,
    } = body;

    await validationSchemaProduct
      .validate(body, { abortEarly: false })
      .catch((err) => {
        throw new ValidationFormCustomerError(err);
      });

    const newProduct = await productService.createProduct({
      name: name.trim(),
      additionalInformation: additionalInformation?.trim() || null,
      type,
      unityPrice:
        type === 'UN' || type === 'UN_KG' ? parseFloat(unityPrice) : null,
      unitaryWeight: type === 'UN_KG' ? parseFloat(unitaryWeight) : null,
      weightPrice:
        type === 'KG' || type === 'UN_KG' ? parseFloat(weightPrice) : null,
    });

    return c.json({ output: newProduct }, 201);
  } catch (error) {
    if (error instanceof ValidationFormCustomerError) {
      return c.json({ validationResult: error.errors }, 400);
    }
    return handleError(c, error, 'Erro ao criar produto');
  }
};

/**
 * Atualizar produto
 */
export const updateProduct = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const productId = parseInt(id, 10);

    const body = await c.req.json<IProduct>();

    await validationSchemaProduct
      .validate(body, { abortEarly: false })
      .catch((err) => {
        throw new ValidationFormProductError(err);
      });

    const productUpdated = await productService.updateProduct(productId, body);

    return c.json({ output: productUpdated }, 201);
  } catch (error) {
    if (error instanceof ValidationFormProductError) {
      return c.json({ validationResult: error.errors }, 400);
    }
    return handleError(c, error, 'Erro ao atualizar produto');
  }
};

/**
 * Deletar produto
 */
export const deleteProduct = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const productId = parseInt(id, 10);

    if (isNaN(productId) || productId < 1) {
      return handleValidation(c, 'ID do produto inválido');
    }

    await productService.deleteProduct(productId);

    return c.body(null, 204);
  } catch (error) {
    if (error instanceof Error) {
      if (
        error.message.includes('not found') ||
        error.message.includes('não encontrado')
      ) {
        return handleNotFound(c, 'Produto', c.req.param('id'));
      }
      if (error.message.includes('está vinculado a um pedido')) {
        return handleValidation(c, error.message);
      }
    }
    return handleError(c, error, 'Erro ao deletar produto');
  }
};
