import { PrismaClient } from '@prisma/client';
import {
  GetCustomersParams,
  ICustomer,
  PaginatedCustomers,
} from '../interfaces/Customer.interface';

const prisma = new PrismaClient();

export const findByCnpj = async (cnpj: string) => {
  return prisma.customer.findUnique({
    where: { cnpj },
  });
};

export const createCustomer = async (customerData: ICustomer) => {
  const newCustomer = await prisma.customer.create({
    data: customerData,
  });
  return newCustomer;
};

export const getAllCustomers = async (
  params: GetCustomersParams,
): Promise<PaginatedCustomers> => {
  const { page, limit, name, cnpj } = params;

  // Calcula o offset (skip)
  const skip = (page - 1) * limit;

  // Monta o objeto where para filtros
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (name) {
    const nameLower = name.toLowerCase();
    where.OR = [
      {
        name: {
          contains: nameLower,
        },
      },
      {
        fantasyName: {
          contains: nameLower,
        },
      },
    ];
  }
  if (cnpj) {
    where.cnpj = { contains: cnpj };
  }

  // Busca os clientes com paginação
  const [customers, total] = await Promise.all([
    prisma.customer.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    }),
    prisma.customer.count({ where }),
  ]);

  return {
    data: customers,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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
