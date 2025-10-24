import { IOptionSelect } from '../../../commons/interfaces/ICommon.interface';
import { IOrder } from '../interfaces/IOrder.interface';
import { ITotalProducts } from '../interfaces/ITotalProducts.interface';

export const responseOrders = (): IOrder[] => [
  {
    id: 6,
    customerId: 2,
    deliveryDate: '2024-12-13T03:00:00.000Z',
    additionalInformation: null,
    createdAt: '2024-12-09T20:53:57.831Z',
    updatedAt: '2024-12-09T20:53:57.831Z',
    orderDetails: [
      {
        id: 6,
        orderId: 6,
        productId: 3,
        quantity: 200,
        type: 'UN',
        weight: null,
        additionalInformation: null,
        updatedAt: '2024-12-09T20:53:57.831Z',
        createdAt: '2024-12-09T20:53:57.831Z',
        product: {
          id: 3,
          name: 'Pão de sal',
          additionalInformation: null,
          type: 'UN_KG',
          unityPrice: 1.2,
          unitaryWeight: 0.06,
          weightPrice: 0.8,
        },
      },
    ],
    customer: {
      id: 2,
      name: 'Caixa Escolar da Escola Municipal Murilo Rubião',
      fantasyName: 'Murilo Rubião',
      additionalInformation: 'Cortado e embalado',
      address: 'teste',
      cnpj: '12345678000122',
      stateRegistration: '12345678',
      isStateRegistrationExempt: false,
      phoneNumber: '11123456789',
      updatedAt: '2024-12-09T15:17:49.443Z',
      createdAt: '2024-12-09T16:36:43.289Z',
    },
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
    product: 'Pao de sal',
    type: 'UN',
    quantity: 200,
    weight: 0,
    totalOrders: 1,
  },
];
