import { IOrder } from '../interfaces/IOrder';
import { IProfile } from '../interfaces/IProfile';

export const responseProfileCustomer = (): IProfile => ({
  id: 1,
  firstName: 'John',
  email: 'vovonicolina@gmail.com',
});

export const responseOrders = (): IOrder[] => [
  {
    id: 1,
    customer: { id: 1, value: 'Vovo geralda' },
    deliveryDate: '2024-07-21T09:00:00.000Z',
    products: [
      {
        id: 1,
        productId: 2,
        name: 'Pão de doce',
        quantity: 100,
        type: 'un',
        additionalInformations: 'cortado e embalado',
      },
      {
        id: 2,
        productId: 1,
        name: 'Pão de sal',
        quantity: 100,
        type: 'un',
        additionalInformations: 'cortado e embalado',
      },
    ],
  },
  {
    id: 2,
    customer: { id: 2, value: 'Murilo Rubião' },
    deliveryDate: '2024-07-21T09:00:00.000Z',
    products: [
      {
        id: 1,
        productId: 2,
        name: 'Pão de doce',
        quantity: 100,
        type: 'un',
        additionalInformations: 'cortado e embalado',
      },
      {
        id: 2,
        productId: 1,
        name: 'Pão de sal',
        quantity: 100,
        type: 'un',
        additionalInformations: 'cortado e embalado',
      },
    ],
  },
];
