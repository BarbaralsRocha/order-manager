import { ValidationError } from 'yup';

export class DuplicateCnpjError extends Error {
  errors: [{ [key: string]: string }];

  constructor() {
    super('CNPJ já está cadastrado no sistema');
    this.name = 'DuplicateCnpjError';
    this.errors = [{ cnpj: 'CNPJ já está cadastrado no sistema' }];
  }
}

export class ValidationFormCustomerError extends Error {
  constructor(errors: ValidationError) {
    super('Erro de validação do formulário de cliente');
    this.name = 'ValidationFormCustomerError';
    const errorDetailed = errors.inner.reduce(
      (acc, current) => {
        acc.push({
          [current.path || 'unknown']: current.message,
        });
        return acc;
      },
      [] as { [key: string]: string }[],
    );
    this.errors = errorDetailed;
  }

  errors: { [key: string]: string }[];
}
