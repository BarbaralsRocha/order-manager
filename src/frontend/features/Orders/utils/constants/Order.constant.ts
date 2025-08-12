import {
  IFilters,
  IOrder,
  IProductOrder,
} from '../../interfaces/IOrder.interface';
import { OrderSectionType, OrderSectionValue } from '../types/Order.type';

export const OrderSection: Record<OrderSectionType, OrderSectionValue> = {
  customers: 'Clientes',
  orders: 'Encomendas',
  products: 'Produtos',
};

export const INITIAL_VALUES_ORDERS: IOrder = {
  id: null,
  customerId: null,
  deliveryDate: undefined,
  additionalInformation: null,
  createdAt: undefined,
  updatedAt: undefined,
  orderDetails: [],
  customer: null,
};

export const INITIAL_VALUES_PRODUCT_ORDER: IProductOrder = {
  id: null,
  productId: null,
  orderId: null,
  weight: null,
  quantity: null,
  type: null,
  additionalInformation: null,
  product: null,
};

export const INITIAL_VALUES_FILTERS: IFilters = {
  customerId: null,
  startDate: new Date(),
  time: null,
  products: [],
};
