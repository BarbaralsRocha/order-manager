import { Measurement } from '../../../commons/types/Measurement.type';
import { ICustomer } from '../../Customers/interfaces/ICustomer';
import { IProduct } from '../../Products/utils/interfaces/IProduct';

export interface IOrder {
  id: number | null;
  customerId: number | null;
  deliveryDate?: string;
  additionalInformation?: string | null;
  createdAt?: string;
  updatedAt?: string;
  orderDetails: IProductOrder[];
  customer: ICustomer | null;
}

export interface IProductOrder {
  id: number | null;
  orderId: number | null;
  productId: number | null;
  quantity: number | null;
  weight: number | null;
  type: Measurement | null;
  additionalInformation: string | null;
  createdAt?: string;
  updatedAt?: string;
  product: IProduct | null;
}

export type OrderKeys = keyof IOrder;
export type OrderValues = IOrder[OrderKeys];

export type ProductOrderKeys = keyof IProductOrder;
export type ProductOrderValues = IProductOrder[ProductOrderKeys];

export interface IFilters {
  customerId: number | null;
  startDate: Date | null;
  time: string | null;
  products: string[];
}
