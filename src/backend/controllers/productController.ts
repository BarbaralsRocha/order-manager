/* eslint-disable import/no-extraneous-dependencies */
import * as productService from '../services/productService';
import { Context } from 'hono';

const errorResponse = (c: Context, message: string) =>
  c.json(
    {
      message,
      success: false,
    },
    400,
  );

export const listProducts = async (ctx: Context) => {
  const products = await productService.getAllProducts();
  return ctx.json({ output: products });
};

export const createProduct = async (c: Context) => {
  try {
    const {
      name,
      additionalInformation,
      type,
      unityPrice,
      unitaryWeight,
      weightPrice,
    } = await c.req.json();

    if (!name || !type) {
      return errorResponse(c, 'Nome e Tipo são obrigatórios');
    }

    if (type === 'UN' && !unityPrice) {
      return errorResponse(
        c,
        'Preço unitário é obrigatório para produtos do tipo UN',
      );
    }

    if (type === 'KG' && !weightPrice) {
      return errorResponse(
        c,
        'Peso unitário e Preço por Quilo são obrigatórios para produtos do tipo KG',
      );
    }

    if (type === 'UN_KG' && (!unityPrice || !unitaryWeight || !weightPrice)) {
      return errorResponse(
        c,
        'Preço unitário, Peso unitário e Preço por quilo são obrigatórios para produtos do tipo UN_KG',
      );
    }

    const newProduct = await productService.createProduct({
      name,
      additionalInformation,
      type,
      unityPrice: unityPrice || null,
      unitaryWeight: unitaryWeight || null,
      weightPrice: weightPrice || null,
    });

    return c.json({ output: newProduct }, 201);
  } catch (error) {
    return c.json({ error: 'Failed to create product' }, 500);
  }
};

export const updateProduct = async (c: Context) => {
  try {
    const productId = parseInt(c.req.param('id'), 10);
    const productData = await c.req.json();
    const productUpdated = await productService.updateProduct(
      productId,
      productData,
    );

    return c.json({ output: productUpdated }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to create product' }, 500);
  }
};

export const deleteProduct = async (c: Context) => {
  try {
    const productId = parseInt(c.req.param('id'), 10);
    const productUpdated = await productService.deleteProduct(productId);

    return c.json({ output: productUpdated }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to create product' }, 500);
  }
};
