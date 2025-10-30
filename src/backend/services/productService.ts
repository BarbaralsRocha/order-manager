/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProduct } from '../interfaces/Product.interface';
import { ProductModel } from '../models/productModel';
import { NotFoundError, DatabaseError } from '../utils/handleErrors';

interface GetAllProductsParams {
  page: number;
  limit: number;
  search: string;
}

interface GetAllProductsResult {
  products: any[];
  total: number;
}

/**
 * Buscar todos os produtos com paginação e filtros
 */
export const getAllProducts = async (
  params: GetAllProductsParams,
): Promise<GetAllProductsResult> => {
  try {
    const { page, limit, search } = params;

    const result = await ProductModel.findAllWithFilters({
      page,
      limit,
      search,
    });

    return result;
  } catch (error) {
    throw new DatabaseError('Erro ao buscar produtos');
  }
};

/**
 * Buscar produto por ID
 */
export const getProductById = async (productId: number) => {
  try {
    const product = await ProductModel.findById(productId);
    return product;
  } catch (error) {
    throw new DatabaseError('Erro ao buscar produto');
  }
};

/**
 * Criar novo produto
 */
export const createProduct = async (productData: IProduct) => {
  try {
    const newProduct = await ProductModel.createProduct(productData);
    return newProduct;
  } catch (error) {
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      throw new Error('Já existe um produto com este nome');
    }
    throw new DatabaseError('Erro ao criar produto');
  }
};

/**
 * Atualizar produto e opcionalmente atualizar preços em pedidos
 */
export const updateProduct = async (
  productId: number,
  productData: IProduct,
) => {
  try {
    // Verificar se o produto existe
    const existingProduct = await ProductModel.findById(productId);
    if (!existingProduct) {
      throw new NotFoundError('Produto não encontrado');
    }

    // Atualizar o produto
    const updatedProduct = await ProductModel.updateProduct(
      productId,
      productData,
    );

    // Se há mudança de preço e datas fornecidas, atualizar pedidos
    const priceChanged =
      productData.unityPrice !== undefined ||
      productData.weightPrice !== undefined ||
      productData.unitaryWeight !== undefined;

    if (priceChanged) {
      await ProductModel.updateOrderPrices(productId, {
        unityPrice: updatedProduct.unityPrice,
        weightPrice: updatedProduct.weightPrice,
        unitaryWeight: updatedProduct.unitaryWeight,
      });
    }

    return updatedProduct;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    throw new DatabaseError('Erro ao atualizar produto');
  }
};

/**
 * Deletar produto
 */
export const deleteProduct = async (productId: number) => {
  try {
    // Verificar se o produto existe
    const existingProduct = await ProductModel.findById(productId);
    if (!existingProduct) {
      throw new NotFoundError('Produto não encontrado');
    }

    const productDeleted = await ProductModel.deleteProduct(productId);
    return productDeleted;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    if (
      error instanceof Error &&
      error.message.includes('está vinculado a um pedido')
    ) {
      throw error;
    }
    throw new DatabaseError('Erro ao deletar produto');
  }
};
