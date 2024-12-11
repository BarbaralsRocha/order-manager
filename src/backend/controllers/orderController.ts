import { Context } from 'hono';
import * as orderService from '../services/orderService';
import { ICreateOrder } from '../interfaces/Order.interface';
import XLSX from 'xlsx';
import { IFilters } from '../interfaces/Filters.interface';

export const createOrder = async (c: Context) => {
  try {
    const orderData: ICreateOrder = await c.req.json();
    console.log({ orderData });
    const newOrder = await orderService.createOrder(orderData);

    return c.json({ output: newOrder }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to create order' }, 500);
  }
};

export const getOrderById = async (c: Context) => {
  try {
    const orderId = parseInt(c.req.param('id'), 10);
    const order = await orderService.getOrderById(orderId);

    if (!order) return c.json({ error: 'Order not found' }, 404);

    return c.json({ output: order }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to fetch order' }, 500);
  }
};

export const getAllOrders = async (c: Context) => {
  try {
    const { customerName, date, time, products } = c.req.query() as IFilters;
    const orders = await orderService.getAllOrders();
    return c.json({ output: orders }, 200);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to fetch orders' }, 500);
  }
};

export const updateOrder = async (c: Context) => {
  try {
    const orderId = parseInt(c.req.param('id'), 10);
    const orderData: ICreateOrder = await c.req.json();
    const orderUpdated = await orderService.updateOrder(orderId, orderData);

    return c.json({ output: orderUpdated }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to create order' }, 500);
  }
};

export const deleteOrder = async (c: Context) => {
  try {
    const orderId = parseInt(c.req.param('id'), 10);
    const orderUpdated = await orderService.deleteOrder(orderId);

    return c.json({ output: orderUpdated }, 201);
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to create order' }, 500);
  }
};

export const exportOrdersToExcel = async (c: Context) => {
  try {
    // Obtenha os dados de ordens do serviço
    const orders = await orderService.getAllOrders();

    // Personalize as colunas que deseja no Excel
    const formattedOrders = orders.map((order) => ({
      ID: order.id,
      Cliente: order.customer.fantasyName || order.customer.name,
      'Data de Entrega': order.deliveryDate.toISOString().split('T')[0],
      Produtos: order.orderDetails
        .map((detail) => `${detail.product.name} (${detail.quantity || 0}x)`)
        .join(', '),
    }));

    // Crie a planilha e o arquivo Excel
    const ws = XLSX.utils.json_to_sheet(formattedOrders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ordens');

    // Converta para buffer
    const excelBuffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    // Defina o cabeçalho para download no navegador
    c.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    c.header('Content-Disposition', 'attachment; filename="Ordens.xlsx"');

    return c.body(excelBuffer);
  } catch (error) {
    console.error('Erro ao exportar ordens para Excel:', error);
    return c.json({ error: 'Não foi possível gerar o arquivo Excel' }, 500);
  }
};

export const getProductTotals = async (c: Context) => {
  try {
    const { startDate, endDate } = c.req.query() as {
      startDate?: string;
      endDate?: string;
    };

    if (!startDate || !endDate) {
      return c.json({ output: 'Por favor, forneça startDate e endDate.' }, 200);
    }

    // Converta as strings em objetos Date
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return c.json({ output: 'Datas inválidas fornecidas.' }, 400);
    }

    const totals = await orderService.getTotalByProductInDateRange(start, end);

    return c.json({ output: totals }, 200);
  } catch (error) {
    console.error('Erro ao obter totais de produtos:', error);
    return c.json({ output: 'Erro ao obter totais de produtos.' }, 500);
  }
};
