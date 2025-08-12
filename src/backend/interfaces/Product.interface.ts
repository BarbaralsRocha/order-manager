import { ProductType } from '@prisma/client';

export interface IProduct {
  name: string;
  additionalInformation: string;
  type: ProductType;
  unityPrice: number;
  unitaryWeight: number;
  weightPrice: number;
}
