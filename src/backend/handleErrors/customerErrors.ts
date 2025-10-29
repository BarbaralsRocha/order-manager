import { ValidationError } from 'yup';

export class EdgeCasesConflitError extends Error {
  errors: [{ [key: string]: string }];

  constructor(message: string, key: string, name: string) {
    super(message);
    this.name = name;
    this.errors = [{ [key]: message }];
  }
}

export class EdgeCasesAlertError extends Error {
  errors: string;

  constructor(message: string, key: string, name: string) {
    super(message);
    this.name = name;
    this.errors = message;
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
