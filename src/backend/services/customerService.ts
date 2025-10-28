/* eslint-disable @typescript-eslint/no-explicit-any */

import { EdgeCasesConflitError } from '../handleErrors/customerErrors';
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
  return customerModel.deleteCustomer(customerId);
};
