/* eslint-disable @typescript-eslint/no-explicit-any */

import { DuplicateCnpjError } from '../handleErrors/customerErrors';
import {
  GetCustomersParams,
  ICustomer,
} from '../interfaces/Customer.interface';
import * as customerModel from '../models/customerModel';

export const createCustomer = async (customerData: any) => {
  const existingCustomer = await customerModel.findByCnpj(customerData.cnpj);

  if (existingCustomer) {
    throw new DuplicateCnpjError();
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
  try {
    const existingCustomer = await customerModel.findByCnpj(customerData.cnpj);

    if (!existingCustomer) {
      const error: any = new Error('Cliente não encontrado');
      error.code = 'P2025';
      throw error;
    }

    // Se o CNPJ mudou, verificar se já não existe para outro cliente
    if (customerData.cnpj !== existingCustomer.cnpj) {
      const customerWithCnpj = await customerModel.findByCnpj(
        customerData.cnpj,
      );

      if (customerWithCnpj && customerWithCnpj.id !== customerId) {
        const error: any = new Error('CNPJ já cadastrado');
        error.code = 'P2002';
        error.meta = { target: ['cnpj'] };
        throw error;
      }
    }
    return customerModel.updateCustomer(customerId, customerData);
  } catch (error) {}
};

export const deleteCustomer = async (customerId: number) => {
  return customerModel.deleteCustomer(customerId);
};
