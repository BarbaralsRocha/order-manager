/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  EdgeCasesAlertError,
  EdgeCasesConflitError,
} from '../handleErrors/customerErrors';
import {
  GetCustomersParams,
  ICustomer,
} from '../interfaces/Customer.interface';
import * as customerModel from '../models/customerModel';

export const createCustomer = async (customerData: any) => {
  const existingCustomer = await customerModel.findByCnpj(customerData.cnpj);

  if (existingCustomer) {
    throw new EdgeCasesConflitError(
      'CNPJ já está cadastrado no sistema',
      'cnpj',
      'DuplicateCnpjError',
    );
  }
  return customerModel.createCustomer(customerData);
};

export const getAllCustomers = async (params: GetCustomersParams) => {
  return customerModel.getAllCustomers(params);
};

export const updateCustomer = async (
  customerId: number,
  customerData: ICustomer,
) => {
  const customerWithCnpj = await customerModel.findByCnpj(customerData.cnpj);
  const existingCustomer = await customerModel.findCustomerById(customerId);

  if (!existingCustomer) {
    const error: any = new Error('Cliente não encontrado');
    error.code = 'P2025';
    throw error;
  }
  if (customerWithCnpj && customerWithCnpj.id !== customerId) {
    throw new EdgeCasesConflitError(
      'CNPJ já está cadastrado no sistema',
      'cnpj',
      'DuplicateCnpjError',
    );
  }

  return customerModel.updateCustomer(customerId, customerData);
};

export const deleteCustomer = async (customerId: number) => {
  // Edge Case: Verificar se o cliente existe antes de tentar deletar
  const customer = await customerModel.findCustomerById(customerId);

  if (!customer) {
    throw new Error('Cliente não encontrado');
  }

  const hasOrders = await customerModel.hasAssociatedOrders(customerId);

  if (hasOrders) {
    throw new EdgeCasesAlertError(
      'Não é possível deletar o cliente pois ele possui pedidos associados',
      'customer',
      'CustomerHasOrdersError',
    );
  }

  return customerModel.deleteCustomer(customerId);
};
