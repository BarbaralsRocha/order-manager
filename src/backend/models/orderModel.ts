import { PrismaClient } from '@prisma/client';
import {
  ICreateOrder,
  ICreateOrderDetail,
} from '../interfaces/Order.interface';
import { IFilters } from '../interfaces/Filters.interface';

interface WhereClause {
  customerId?: number;
  deliveryDate?:
    | Date
    | {
        gte: Date;
        lt: Date;
      };
  orderDetails?: { some: { productId: { in: number[] } } };
}

const prisma = new PrismaClient();

export const createOrder = async (orderData: ICreateOrder) => {
  const { customerId, deliveryDate, additionalInformation, orderDetails } =
    orderData;

  try {
    return await prisma.order.create({
      data: {
        customerId,
        deliveryDate: new Date(deliveryDate),
        additionalInformation,
        orderDetails: {
          create: orderDetails.map((product) => ({
            productId: product.productId,
            quantity: product.quantity,
            type: product.type,
            weight: product.weight,
            additionalInformation: product.additionalInformation,
          })),
        },
      },
      include: { orderDetails: { include: { product: true } }, customer: true },
    });
  } catch (error) {
    console.log({ error });
    throw new Error('Failed to create order.');
  }
};

export const getOrderById = async (orderId: number) => {
  try {
    return await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderDetails: { include: { product: true } }, customer: true },
    });
  } catch (error) {
    throw new Error('Failed to fetch order.');
  }
};

export const getAllOrders = async (filters: IFilters) => {
  const { customerId, startDate, time, products } = filters;

  const where: WhereClause = {};
  if (customerId) where.customerId = Number(customerId);
  if (startDate) {
    const deliveryDate = new Date(startDate);
    const nextDay = new Date(startDate);
    nextDay.setDate(deliveryDate.getDate() + 1);
    where.deliveryDate = {
      gte: deliveryDate,
      lt: nextDay,
    };

    if (time) {
      const dateTime = new Date(`${startDate}T${time}`);
      where.deliveryDate = dateTime;
    }
  }
  if (products) {
    const productArray = Array.isArray(products)
      ? products.map((product) => +product)
      : (products as string).split(',').map(Number);
    if (productArray.length > 0) {
      where.orderDetails = { some: { productId: { in: productArray } } };
    }
  }

  try {
    return await prisma.order.findMany({
      where,
      include: { orderDetails: { include: { product: true } }, customer: true },
    });
  } catch (error) {
    throw new Error('Failed to fetch orders.');
  }
};

export const updateOrder = async (orderId: number, orderData: ICreateOrder) => {
  try {
    // 1. Primeiro, vamos buscar os IDs existentes dos detalhes do pedido
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderDetails: true },
    });

    if (!existingOrder) {
      throw new Error('Order not found');
    }

    // 2. Criar um conjunto dos IDs dos detalhes que vieram na requisição
    const updatedDetailIds = new Set(
      orderData.orderDetails
        .map((detail) => detail.id)
        .filter((id): id is number => id !== undefined),
    );

    // 3. Identificar os IDs que precisam ser deletados
    const detailsToDelete = existingOrder.orderDetails
      .filter((detail) => !updatedDetailIds.has(detail.id))
      .map((detail) => detail.id);

    // 4. Realizar a atualização em uma transação
    return await prisma.$transaction(async (tx) => {
      // 4.1 Deletar os detalhes que não existem mais
      if (detailsToDelete.length > 0) {
        await tx.orderDetail.deleteMany({
          where: { id: { in: detailsToDelete } },
        });
      }

      // 4.2 Atualizar o pedido e seus detalhes
      return tx.order.update({
        where: { id: orderId },
        data: {
          deliveryDate: new Date(orderData.deliveryDate),
          additionalInformation: orderData.additionalInformation,
          orderDetails: {
            upsert: orderData.orderDetails.map(
              (product: ICreateOrderDetail) => ({
                where: {
                  id: product.id || 0,
                },
                update: {
                  productId: product.productId,
                  quantity: product.quantity,
                  type: product.type,
                  weight: product.weight,
                  additionalInformation: product.additionalInformation,
                },
                create: {
                  productId: product.productId,
                  quantity: product.quantity,
                  type: product.type,
                  weight: product.weight,
                  additionalInformation: product.additionalInformation,
                },
              }),
            ),
          },
        },
        include: {
          orderDetails: {
            include: {
              product: true,
            },
          },
          customer: true,
        },
      });
    });
  } catch (error) {
    console.log({ error });
    throw new Error('Failed to update order.');
  }
};

export const deleteOrder = async (orderId: number) => {
  try {
    await prisma.orderDetail.deleteMany({
      where: { orderId },
    });
    return await prisma.order.delete({
      where: { id: orderId },
    });
  } catch (error) {
    throw new Error('Failed to delete order.');
  }
};

export const getTotalByProductInDateRange = async (filters: IFilters) => {
  const { startDate } = filters;

  const where: WhereClause = {};
  if (startDate) {
    const deliveryDate = new Date(startDate);
    const nextDay = new Date(startDate);
    nextDay.setDate(deliveryDate.getDate() + 1);

    where.deliveryDate = {
      gte: deliveryDate,
      lt: nextDay,
    };
  }

  try {
    const orders = await prisma.order.findMany({
      where,
      select: { id: true },
    });

    if (orders.length === 0) {
      return [];
    }

    const orderIds = orders.map((order) => order.id);

    const groupedTotals = await prisma.orderDetail.groupBy({
      by: ['productId', 'type'],
      where: {
        orderId: {
          in: orderIds,
        },
      },
      _sum: {
        quantity: true,
        weight: true,
      },
      _count: {
        orderId: true,
      },
    });

    if (groupedTotals.length === 0) {
      return [];
    }

    const productIds = groupedTotals.map((group) => group.productId);

    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
      select: {
        id: true,
        name: true,
        unityPrice: true,
        type: true,
      },
    });

    return groupedTotals.map((group) => {
      const product = products.find((p) => p.id === group.productId);

      return {
        productId: product?.id,
        product: product?.name || 'Produto desconhecido',
        type: group.type || 'Desconhecido',
        unitPrice: product?.unityPrice || 0,
        quantity: group._sum?.quantity || 0,
        weight: group._sum?.weight || 0,
        totalOrders: group._count?.orderId || 0,
      };
    });
  } catch (error) {
    console.error('Error calculating totals by product:', error);
    throw new Error('Failed to calculate totals.');
  }
};
