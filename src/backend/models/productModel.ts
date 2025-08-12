import { PrismaClient, ProductType } from '@prisma/client';
import { IProduct } from '../interfaces/Product.interface';

const prisma = new PrismaClient();

export const ProductModel = {
  async findAll() {
    return prisma.product.findMany();
  },

  async createProduct(productData: IProduct) {
    const newProduct = await prisma.product.create({
      data: productData,
    });

    return newProduct;
  },

  async updateProduct(productId: number, productData: IProduct) {
    return prisma.product.update({
      where: { id: productId },
      data: productData,
    });
  },

  async deleteProduct(productId: number) {
    return prisma.product.delete({
      where: { id: productId },
    });
  },
};
