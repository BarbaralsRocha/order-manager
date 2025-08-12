import { IProduct } from '../interfaces/Product.interface';
import { ProductModel } from '../models/productModel';

export const getAllProducts = async () => {
  const products = await ProductModel.findAll();
  return products;
};

export const createProduct = async (productData: IProduct) => {
  const newProduct = await ProductModel.createProduct(productData);
  return newProduct;
};

export const updateProduct = async (
  productId: number,
  productData: IProduct,
) => {
  const newProduct = await ProductModel.updateProduct(productId, productData);
  return newProduct;
};

export const deleteProduct = async (productId: number) => {
  const productDeleted = await ProductModel.deleteProduct(productId);
  return productDeleted;
};
