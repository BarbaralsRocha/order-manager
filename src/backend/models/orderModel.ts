import { PrismaClient } from '@prisma/client';
import {
  ICreateOrder,
  ICreateOrderDetail,
} from '../interfaces/Order.interface';

const prisma = new PrismaClient();

export const createOrder = async (orderData: ICreateOrder) => {
  const { customer, deliveryDate, additionalInformation, orderDetails } =
    orderData;

  return prisma.order.create({
    data: {
      customerId: customer.id,
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
};

export const getOrderById = async (orderId: number) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: { orderDetails: { include: { product: true } }, customer: true },
  });
};

export const getAllOrders = async () => {
  return prisma.order.findMany({
    include: { orderDetails: { include: { product: true } }, customer: true },
  });
};

export const updateOrder = async (orderId: number, orderData: ICreateOrder) => {
  return prisma.order.update({
    where: { id: orderId },
    data: {
      deliveryDate: orderData.deliveryDate,
      additionalInformation: orderData.additionalInformation,
      orderDetails: {
        update: orderData.orderDetails.map((product: ICreateOrderDetail) => ({
          where: { id: orderId },
          data: {
            productId: product.productId,
            quantity: product.quantity,
            type: product.type,
            weight: product.weight,
            additionalInformation: product.additionalInformation,
          },
        })),
      },
    },
  });
};

export const deleteOrder = async (orderId: number) => {
  await prisma.orderDetail.deleteMany({
    where: { orderId },
  });
  return prisma.order.delete({
    where: { id: orderId },
  });
};

export const getTotalByProductInDateRange = async (
  startDate: Date,
  endDate: Date,
) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        deliveryDate: {
          lte: endDate,
          gte: startDate,
        },
      },
      select: { id: true },
    });

    if (orders.length === 0) {
      return [];
    }

    const orderIds = orders.map((order) => order.id);

    const groupedTotals = await prisma.orderDetail.groupBy({
      by: ['productId'],
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
        product: product?.name || 'Produto desconhecido',
        type: product?.type || 'Desconhecido',
        unitPrice: product?.unityPrice || 0,
        quantity: group._sum?.quantity || 0,
        weight: group._sum?.weight || 0,
        totalOrders: group._count?.orderId || 0,
      };
    });
  } catch (error) {
    console.error('Erro ao calcular totais por produto:', error);
    throw new Error('Não foi possível calcular os totais.');
  }
};
