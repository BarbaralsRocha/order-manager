import { IProduct } from '../utils/interfaces/IProduct';

export const responseProducts = (): IProduct[] => [
  {
    id: 1,
    name: 'Pao de sal',
    type: ['KG', 'UN'],
    unityPrice: 0.69,
    unitaryWeight: 0.05,
    totalWeight: 0.4,
    additionalInformations: null,
  },
  {
    id: 1,
    name: 'Manteiga',
    type: ['UN'],
    unityPrice: 0.69,
    unitaryWeight: null,
    totalWeight: null,
    additionalInformations: null,
  },
];
