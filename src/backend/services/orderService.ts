import * as orderModel from '../models/orderModel';
import { ICreateOrder } from '../interfaces/Order.interface';
import { IFilters } from '../interfaces/Filters.interface';

export const createOrder = async (orderData: ICreateOrder) => {
  return orderModel.createOrder(orderData);
};

export const getOrderById = async (orderId: number) => {
  return orderModel.getOrderById(orderId);
};

export const getAllOrders = async (filters: IFilters) => {
  return orderModel.getAllOrders(filters);
};

export const updateOrder = async (orderId: number, orderData: ICreateOrder) => {
  return orderModel.updateOrder(orderId, orderData);
};

export const deleteOrder = async (orderId: number) => {
  return orderModel.deleteOrder(orderId);
};

export const getTotalByProductInDateRange = async (filters: IFilters) => {
  const { products } = filters;
  const totals = await orderModel.getTotalByProductInDateRange(filters);

  if (products && products.length > 0) {
    const productIds = products.map((product) => Number(product));
    const filteredTotals = totals.filter((total) =>
      productIds.some((productId) => productId === total.productId),
    );
    return filteredTotals;
  }

  return totals;
};
