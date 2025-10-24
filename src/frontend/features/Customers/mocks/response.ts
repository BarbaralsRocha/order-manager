import { ICustomer } from '../interfaces/ICustomer';

export const responseCustomer = (): ICustomer[] => [
  {
    id: 1,
    name: 'Customer 1',
    address: 'Address 1',
    phoneNumber: '123456789',
    cnpj: '12345678912345',
    stateRegistration: null,
    isStateRegistrationExempt: false,
    fantasyName: 'Fantasy Name 1',
  },
  {
    id: 2,
    name: 'Customer 2',
    address: 'Address 1',
    phoneNumber: '123456789',
    cnpj: '12345678912345',
    stateRegistration: '123456789',
    isStateRegistrationExempt: true,
    fantasyName: 'Fantasy Name 1',
  },
];
