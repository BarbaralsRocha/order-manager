import { ProductType } from '@prisma/client';

export interface ICreateOrder {
  customer: {
    id: number;
    name: string;
  };
  deliveryDate: string;
  additionalInformation?: string;
  orderDetails: ICreateOrderDetail[];
}

export interface ICreateOrderDetail {
  orderId: number;
  productId: number;
  quantity: number;
  type: ProductType;
  weight: number;
  additionalInformation?: string;
}
