import { IOptionSelect } from '../../../interfaces/ICommon.interface';
import { IOrder } from '../interfaces/IOrder.interface';
import { ITotalProducts } from '../interfaces/ITotalProducts.interface';

export const responseOrders = (): IOrder[] => [
  {
    id: 1,
    customer: { id: 1, name: 'Vovo geralda' },
    deliveryDate: '2024-07-12T11:00:00.000Z',
    products: [
      {
        id: 1,
        productId: 2,
        name: 'Pao de doce',
        quantity: 100,
        type: 'UN',
        additionalInformations: 'cortado e embalado',
      },
      {
        id: 2,
        productId: 1,
        name: 'Pao de sal',
        quantity: 100,
        type: 'UN',
        additionalInformations: 'cortado e embalado',
      },
    ],
  },
  {
    id: 2,
    customer: { id: 2, name: 'Murilo Rubião' },
    deliveryDate: '2024-07-12T10:00:00.000Z',
    products: [
      {
        id: 1,
        productId: 2,
        name: 'Pao de doce',
        quantity: 100,
        type: 'UN',
        additionalInformations: 'cortado e embalado',
      },
      {
        id: 2,
        productId: 1,
        name: 'Pao de sal',
        quantity: 100,
        type: 'UN',
        additionalInformations: 'cortado e embalado',
      },
    ],
  },
];

export const responseCustomerList = (): IOptionSelect[] => [
  { id: 1, value: 'Vovo Geralda' },
  { id: 2, value: 'Murilo' },
  { id: 3, value: 'Abdala' },
];

export const responseProducts = (): IOptionSelect[] => [
  { id: 1, value: 'Pao de sal' },
  { id: 2, value: 'Pao de doce' },
];

export const responseTotalProducts = (): ITotalProducts[] => [
  {
    id: 1,
    productName: 'Pao de sal',
    total: 200,
  },
  {
    id: 2,
    productName: 'Pao de doce',
    total: 300,
  },
];
