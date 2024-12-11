/* eslint-disable import/no-extraneous-dependencies */
import * as productService from '../services/productService';
import { Context } from 'hono';

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

    const newProduct = await productService.createProduct({
      name,
      additionalInformation,
      type,
      unityPrice,
      unitaryWeight,
      weightPrice,
    });

    return c.json({ output: newProduct }, 201);
  } catch (error) {
    console.log({ error });
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
