import { Customer } from '@prisma/client';

export interface ICustomer {
  name: string;
  fantasyName: string;
  address: string;
  cnpj: string;
  phoneNumber: string;
  stateRegistration: string | null;
  isStateRegistrationExempt: boolean;
  additionalInformation?: string | null;
}

export interface GetCustomersParams {
  page: number;
  limit: number;
  name?: string;
  cnpj?: string;
}

export interface PaginatedCustomers {
  data: ICustomer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
