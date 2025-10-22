import { PrismaClient } from '@prisma/client';
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
      // Verificar se o produto está sendo usado em algum pedido
      const orderDetails = await prisma.orderDetail.findFirst({
        where: { productId },
        include: {
          order: {
            select: {
              id: true,
              deliveryDate: true,
              customer: {
                select: {
                  fantasyName: true,
                },
              },
            },
          },
        },
      });

      if (orderDetails) {
        const { order } = orderDetails;
        throw new Error(
          `Não é possível excluir este produto pois ele está sendo usado no pedido #${order.id} ` +
            `do cliente ${order.customer.fantasyName} ` +
            `com entrega em ${new Date(order.deliveryDate).toLocaleDateString()}`,
        );
      }

      // Se não estiver sendo usado, pode deletar
      return await prisma.product.delete({
        where: { id: productId },
      });
    } catch (error) {
      throw new Error(`Failed to delete product. ${(error as Error).message}`);
    }
  },
};
