import { PrismaClient, ProductType } from '@prisma/client';
import { IProduct } from '../interfaces/Product.interface';

const prisma = new PrismaClient();

export const ProductModel = {
  async findAll() {
    try {
      return await prisma.product.findMany();
    } catch (error) {
      throw new Error('Failed to fetch products.');
    }
  },

  async createProduct(productData: IProduct) {
    try {
      const newProduct = await prisma.product.create({
        data: productData,
      });

      return newProduct;
    } catch (error) {
      throw new Error(`Failed to create product. ${(error as Error).message}`);
    }
  },

  async updateProduct(productId: number, productData: IProduct) {
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId },
      });
      if (!existingProduct) {
        throw new Error('Product not found.');
      }

      return await prisma.product.update({
        where: { id: productId },
        data: productData,
      });
    } catch (error) {
      throw new Error(`Failed to update product. ${(error as Error).message}`);
    }
  },

  async deleteProduct(productId: number) {
    try {
      return await prisma.product.delete({
        where: { id: productId },
      });
    } catch (error) {
      throw new Error(`Failed to delete product. ${(error as Error).message}`);
    }
  },
};
