/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'hono';
import * as orderService from '../services/orderService';
import { ICreateOrder } from '../interfaces/Order.interface';
import XLSX from 'xlsx';
import { IFilters } from '../interfaces/Filters.interface';
import { addFormattedRows } from '../utils/formatRows';
import { handleError, handleValidation } from '../utils/handleErrors';

// Cria uma nova ordem
export const createOrder = async (c: Context) => {
  try {
    const orderData: ICreateOrder = await c.req.json();
    const newOrder = await orderService.createOrder(orderData);
    return c.json({ output: newOrder }, 201);
  } catch (error) {
    return handleError(c, error, 'Failed to create order');
  }
};

// Obtém uma ordem pelo ID
export const getOrderById = async (c: Context) => {
  try {
    const orderId = parseInt(c.req.param('id'), 10);
    const order = await orderService.getOrderById(orderId);
    if (!order) return c.json({ error: 'Order not found' }, 404);
    return c.json({ output: order }, 200);
  } catch (error) {
    return handleError(c, error, 'Failed to fetch order');
  }
};

// Obtém todas as ordens
export const getAllOrders = async (c: Context) => {
  try {
    const filters: IFilters = c.req.query() as IFilters;
    const orders = await orderService.getAllOrders(filters);
    return c.json({ output: orders }, 200);
  } catch (error) {
    return handleError(c, error, 'Failed to fetch orders');
  }
};

// Atualiza uma ordem pelo ID
export const updateOrder = async (c: Context) => {
  try {
    const orderId = parseInt(c.req.param('id'), 10);
    const orderData: ICreateOrder = await c.req.json();
    const orderUpdated = await orderService.updateOrder(orderId, orderData);
    return c.json({ output: orderUpdated }, 201);
  } catch (error) {
    return handleError(c, error, 'Failed to update order');
  }
};

// Deleta uma ordem pelo ID
export const deleteOrder = async (c: Context) => {
  try {
    const orderId = parseInt(c.req.param('id'), 10);
    const orderDeleted = await orderService.deleteOrder(orderId);
    return c.json({ output: orderDeleted }, 201);
  } catch (error) {
    return handleError(c, error, 'Failed to delete order');
  }
};

// Exporta ordens para um arquivo Excel
export const exportOrdersToExcel = async (c: Context) => {
  try {
    const filters: IFilters = c.req.query() as IFilters;
    const orders = await orderService.getAllOrders(filters);
    if (!orders.length) return handleValidation(c, 'Nenhuma ordem encontrada');

    const ws = XLSX.utils.aoa_to_sheet([]);
    addFormattedRows(ws, orders);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Ordens');

    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    c.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    c.header('Content-Disposition', 'attachment; filename="Ordens.xlsx"');
    return c.body(excelBuffer);
  } catch (error) {
    return handleError(c, error, 'Failed to export orders to Excel');
  }
};

// Obtém totais de produtos em um intervalo de datas
export const getProductTotals = async (c: Context) => {
  try {
    const query: IFilters = c.req.queries() as IFilters;
    const filters: IFilters = {
      startDate: query.startDate && query.startDate[0],
      products: query.products ? query.products.map(String) : [],
    };
    const totals = await orderService.getTotalByProductInDateRange(filters);
    return c.json({ output: totals }, 200);
  } catch (error) {
    return handleError(c, error, 'Failed to fetch product totals');
  }
};
