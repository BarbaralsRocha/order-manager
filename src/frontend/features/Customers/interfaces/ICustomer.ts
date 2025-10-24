export interface ICustomer {
  id?: number;
  name: string;
  fantasyName?: string;
  address?: string;
  cnpj?: string;
  phoneNumber?: string;
  stateRegistration?: string | null;
  additionalInformation?: string;
  createdAt?: string;
  updatedAt?: string;
  isStateRegistrationExempt: boolean;
}

export interface ICustomerResponse {
  data: ICustomer[];
  pagination: {
    total: number;
    totalPages: number;
    page: number;
    limit: number;
  };
}
