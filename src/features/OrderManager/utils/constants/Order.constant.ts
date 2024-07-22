import { IOrder } from '../../interfaces/IOrder';

export const INITIAL_VALUES_ORDERS: IOrder = {
  id: null,
  customer: {
    id: null,
    value: null,
  },
  deliveryDate: null,
  products: [
    {
      id: null,
      productId: null,
      name: null,
      quantity: null,
      type: null,
      additionalInformations: null,
    },
  ],
};
