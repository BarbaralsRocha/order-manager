import * as orderModel from '../models/orderModel';
import { ICreateOrder } from '../interfaces/Order.interface';

export const createOrder = async (orderData: ICreateOrder) => {
  return orderModel.createOrder(orderData);
};

export const getOrderById = async (orderId: number) => {
  return orderModel.getOrderById(orderId);
};

export const getAllOrders = async () => {
  return orderModel.getAllOrders();
};

export const updateOrder = async (orderId: number, orderData: ICreateOrder) => {
  return orderModel.updateOrder(orderId, orderData);
};

export const deleteOrder = async (orderId: number) => {
  return orderModel.deleteOrder(orderId);
};

export const getTotalByProductInDateRange = async (
  startDate: Date,
  endDate: Date,
) => {
  return orderModel.getTotalByProductInDateRange(startDate, endDate);
};
