import { PrismaClient } from '@prisma/client';
import { ICustomer } from '../interfaces/Customer.interface';

const prisma = new PrismaClient();

export const createCustomer = async (customerData: ICustomer) => {
  const newCustomer = await prisma.customer.create({
    data: customerData,
  });
  return newCustomer;
};

export const getAllCustomers = async () => {
  const customers = await prisma.customer.findMany();
  return customers;
};

export const updateCustomer = async (
  customerId: number,
  customerData: ICustomer,
) => {
  return prisma.customer.update({
    where: { id: customerId },
    data: customerData,
  });
};

export const deleteCustomer = async (customerId: number) => {
  return prisma.customer.delete({
    where: { id: customerId },
  });
};
