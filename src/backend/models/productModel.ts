import { PrismaClient, Prisma } from '@prisma/client';
import { IProduct } from '../interfaces/Product.interface';
import { Decimal } from '@prisma/client/runtime/library';

const prisma = new PrismaClient();

interface FindAllFilters {
  page: number;
  limit: number;
  search: string;
  type?: 'KG' | 'UN' | 'UN_KG';
}

interface UpdateOrderPricesData {
  unityPrice: Decimal | null;
  weightPrice: Decimal | null;
  unitaryWeight: Decimal | null;
}

export const ProductModel = {
  /**
   * Buscar todos os produtos com filtros e paginação
   */
  async findAllWithFilters(filters: FindAllFilters) {
    try {
      const { page, limit, search } = filters;
      const skip = (page - 1) * limit;

      // Construir where clause
      const where: Prisma.ProductWhereInput = {};

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { id: isNaN(parseInt(search)) ? undefined : parseInt(search) },
        ].filter(
          (condition) =>
            condition.id !== undefined || condition.name !== undefined,
        );
      }

      // Buscar produtos e contagem total
      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take: limit,
          orderBy: { id: 'desc' },
        }),
        prisma.product.count({ where }),
      ]);

      return { products, total };
    } catch (error) {
      throw new Error('Falha ao buscar produtos.');
    }
  },

  /**
   * Buscar todos os produtos (sem paginação)
   */
  async findAll() {
    try {
      return await prisma.product.findMany({
        orderBy: { id: 'desc' },
      });
    } catch (error) {
      throw new Error('Falha ao buscar produtos.');
    }
  },

  /**
   * Buscar produto por ID
   */
  async findById(productId: number) {
    try {
      return await prisma.product.findUnique({
        where: { id: productId },
      });
    } catch (error) {
      throw new Error(`Falha ao buscar produto com ID ${productId}.`);
    }
  },

  /**
   * Criar novo produto
   */
  async createProduct(productData: IProduct) {
    try {
      const newProduct = await prisma.product.create({
        data: productData,
      });
      return newProduct;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Já existe um produto com estes dados.');
        }
      }
      throw new Error(`Falha ao criar produto. ${(error as Error).message}`);
    }
  },

  /**
   * Atualizar produto
   */
  async updateProduct(productId: number, productData: Partial<IProduct>) {
    try {
      const existingProduct = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!existingProduct) {
        throw new Error('Produto não encontrado.');
      }

      return await prisma.product.update({
        where: { id: productId },
        data: productData,
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === 'Produto não encontrado.'
      ) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Já existe um produto com estes dados.');
        }
        if (error.code === 'P2025') {
          throw new Error('Produto não encontrado.');
        }
      }
      throw new Error(
        `Falha ao atualizar produto. ${(error as Error).message}`,
      );
    }
  },

  /**
   * Atualizar preços do produto em pedidos existentes
   */
  async updateOrderPrices(
    productId: number,
    priceData: UpdateOrderPricesData,
    startDate?: Date,
    endDate?: Date,
  ) {
    try {
      // Construir filtro de data
      const dateFilter: Prisma.OrderWhereInput = {};

      if (startDate && endDate) {
        dateFilter.deliveryDate = {
          gte: startDate,
          lte: endDate,
        };
      } else if (startDate) {
        dateFilter.deliveryDate = {
          gte: startDate,
        };
      } else if (endDate) {
        dateFilter.deliveryDate = {
          lte: endDate,
        };
      }

      // Atualizar OrderDetails com base no filtro de data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: any = {};

      if (priceData.unityPrice !== null && priceData.unityPrice !== undefined) {
        updateData.unitPrice = priceData.unityPrice;
      }

      if (
        priceData.weightPrice !== null &&
        priceData.weightPrice !== undefined
      ) {
        updateData.weightPrice = priceData.weightPrice;
      }

      if (
        priceData.unitaryWeight !== null &&
        priceData.unitaryWeight !== undefined
      ) {
        updateData.unitaryWeight = priceData.unitaryWeight;
      }

      if (Object.keys(updateData).length > 0) {
        const result = await prisma.orderDetail.updateMany({
          where: {
            productId,
            order: dateFilter,
          },
          data: updateData,
        });
        return result;
      }

      return { count: 0 };
    } catch (error) {
      throw new Error(
        `Falha ao atualizar preços em pedidos. ${(error as Error).message}`,
      );
    }
  },

  /**
   * Deletar produto
   */
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
        throw new Error(
          `Não é possível excluir este produto pois ele está vinculado a um pedido`,
        );
      }

      return await prisma.product.delete({
        where: { id: productId },
      });
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('está vinculado a um pedido')
      ) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new Error('Produto não encontrado.');
        }
      }
      throw new Error(`Falha ao deletar produto. ${(error as Error).message}`);
    }
  },
};
