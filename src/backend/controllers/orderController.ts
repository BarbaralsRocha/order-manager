/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'hono';
import * as orderService from '../services/orderService';
import { ICreateOrder } from '../interfaces/Order.interface';
import XLSX from 'xlsx';
import { IFilters } from '../interfaces/Filters.interface';

// Função para lidar com erros
const handleError = (c: Context, error: unknown, message: string) => {
  console.error(error);
  return c.json({ error: message }, 500);
};

const handleValidation = (c: Context, message: string) =>
  c.json(
    {
      message,
      success: false,
    },
    400,
  );

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

const addFormattedRows = (ws: XLSX.WorkSheet, orders: any[]) => {
  let rowIndex = 1;
  ws['!merges'] = ws['!merges'] || [];
  orders.forEach((order) => {
    ws[`A${rowIndex}`] = { v: 'Cliente:', s: { font: { bold: true } } };
    ws[`B${rowIndex}`] = {
      v: order.customer.fantasyName || order.customer.name,
      s: { alignment: { horizontal: 'center' } },
    };
    ws[`C${rowIndex}`] = { v: '', s: { alignment: { horizontal: 'center' } } };
    ws[`D${rowIndex}`] = { v: '', s: { alignment: { horizontal: 'center' } } };
    ws['!merges']?.push({
      s: { r: rowIndex - 1, c: 1 },
      e: { r: rowIndex - 1, c: 3 },
    });

    rowIndex++;

    const deliveryDate = new Date(order.deliveryDate);
    const formattedDate = deliveryDate
      .toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(',', ' -');
    ws[`A${rowIndex}`] = { v: 'Data:', s: { font: { bold: true } } };
    ws[`B${rowIndex}`] = {
      v: formattedDate,
      s: { alignment: { horizontal: 'center' } },
    };
    ws['!merges']?.push({
      s: { r: rowIndex - 1, c: 1 },
      e: { r: rowIndex - 1, c: 3 },
    });
    rowIndex++;
    rowIndex++;
    order.orderDetails.forEach((detail: any) => {
      ws[`A${rowIndex}`] = {
        v: `${detail.quantity || detail.weight} ${detail.type}`,
        s: { alignment: { horizontal: 'center' } },
      };
      ws[`B${rowIndex}`] = {
        v: detail.product.name,
        s: { alignment: { horizontal: 'center' } },
      };
      rowIndex++;
    });

    rowIndex++;
  });

  ws['!ref'] = `A1:D${rowIndex - 1}`;
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
