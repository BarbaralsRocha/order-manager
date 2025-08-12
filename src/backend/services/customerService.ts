import { ICustomer } from '../interfaces/Customer.interface';
import * as customerModel from '../models/customerModel';

export const createCustomer = async (customerData: ICustomer) => {
  return customerModel.createCustomer(customerData);
};

export const getAllCustomers = async () => {
  return customerModel.getAllCustomers();
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
