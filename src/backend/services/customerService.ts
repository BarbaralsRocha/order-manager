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
  return customerModel.updateCustomer(customerId, customerData);
};

export const deleteCustomer = async (customerId: number) => {
  return customerModel.deleteCustomer(customerId);
};
