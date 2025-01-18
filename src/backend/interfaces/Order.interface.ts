import { ProductType } from '@prisma/client';

export interface ICreateOrder {
  customerId: number;
  deliveryDate: string;
  additionalInformation?: string;
  orderDetails: ICreateOrderDetail[];
}

export interface ICreateOrderDetail {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  type: ProductType;
  weight: number;
  additionalInformation?: string;
}
