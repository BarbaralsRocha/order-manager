/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICustomer } from '../interfaces/Customer.interface';
import { createCustomerSchema } from '../schemas/customerControllerSchema';
import * as CustomerService from '../services/customerService';
import { Context } from 'hono';
import { handleError } from '../utils/handleErrors';
import {
  DuplicateCnpjError,
  ValidationFormCustomerError,
} from '../handleErrors/customerErrors';

export const createCustomer = async (c: Context) => {
  try {
    const {
      name,
      additionalInformation,
      fantasyName,
      address,
      cnpj,
      stateRegistration,
      isStateRegistrationExempt,
      phoneNumber,
    } = await c.req.json<ICustomer>();

    const body = {
      name,
      additionalInformation,
      fantasyName,
      address,
      cnpj,
      stateRegistration,
      isStateRegistrationExempt,
      phoneNumber,
    };

    try {
      await createCustomerSchema
        .validate(body, { abortEarly: false })
        .catch((err) => {
          throw new ValidationFormCustomerError(err);
        });
      const newCustomer = await CustomerService.createCustomer(body);
      return c.json({ output: newCustomer }, 201);
    } catch (error) {
      if (error instanceof DuplicateCnpjError) {
        return c.json({ validationResult: error.errors }, 409);
      }
      if (error instanceof ValidationFormCustomerError) {
        return c.json({ validationResult: error.errors }, 400);
      }
    }
  } catch (error) {
    return handleError(c, error, 'Falha ao criar cliente');
  }
};

export const getAllCustomers = async (c: Context) => {
  try {
    // Captura os query params
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '20');
    const name = c.req.query('name') || undefined;
    const cnpj = c.req.query('cnpj') || undefined;

    // Validações básicas
    if (page < 1 || limit < 1) {
      return c.json({ error: 'Page and limit must be greater than 0' }, 400);
    }

    const result = await CustomerService.getAllCustomers({
      page,
      limit,
      name,
      cnpj,
    });

    return c.json({ output: result }, 200);
  } catch (error) {
    return handleError(c, error, 'Failed to fetch customers');
  }
};

export const updateCustomer = async (c: Context) => {
  try {
    const customerId = parseInt(c.req.param('id'), 10);
    const customerData: ICustomer = await c.req.json();
    const customerUpdated = await CustomerService.updateCustomer(
      customerId,
      customerData,
    );

    return c.json({ output: customerUpdated }, 201);
  } catch (error) {
    return handleError(c, error, 'Failed to update customer');
  }
};

export const deleteCustomer = async (c: Context) => {
  try {
    const customerId = parseInt(c.req.param('id'), 10);
    const customerUpdated = await CustomerService.deleteCustomer(customerId);

    return c.json({ output: customerUpdated }, 201);
  } catch (error) {
    return handleError(c, error, 'Failed to delete customer');
  }
};
