/* eslint-disable @typescript-eslint/no-explicit-any */
import { Context } from 'hono';

export class AppError extends Error {
  statusCode: number;

  isOperational: boolean;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500, false);
  }
}

/**
 * Erro de validação de formulário (compatível com Yup/Zod)
 */
export class ValidationFormError extends Error {
  errors: { [key: string]: string }[];

  statusCode: number;

  constructor(
    errors: any,
    message: string = 'Erro de validação do formulário',
  ) {
    super(message);
    this.name = 'ValidationFormError';
    this.statusCode = 400;
    // Se for erro do Yup (ValidationError)
    if (errors.inner && Array.isArray(errors.inner)) {
      this.errors = errors.inner.reduce(
        (acc: { [key: string]: string }[], current: any) => {
          acc.push({
            [current.path || 'unknown']: current.message,
          });
          return acc;
        },
        [] as { [key: string]: string }[],
      );
    }
    // Se for objeto de erros simples
    else if (typeof errors === 'object') {
      this.errors = Object.entries(errors).map(([key, value]) => ({
        [key]: String(value),
      }));
    }
    // Fallback
    else {
      this.errors = [{ unknown: String(errors) }];
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Erro específico para validação de formulário de cliente
 */
export class ValidationFormCustomerError extends ValidationFormError {
  constructor(errors: any) {
    super(errors, 'Erro de validação do formulário de cliente');
    this.name = 'ValidationFormCustomerError';
  }
}

/**
 * Erro específico para validação de formulário de produto
 */
export class ValidationFormProductError extends ValidationFormError {
  constructor(errors: any) {
    super(errors, 'Erro de validação do formulário de produto');
    this.name = 'ValidationFormProductError';
  }
}

/**
 * Handler principal de erros
 */
export const handleError = (
  ctx: Context,
  error: unknown,
  defaultMessage: string = 'Internal server error',
) => {
  if (error instanceof AppError) {
    return ctx.json(
      {
        error: {
          message: error.message,
          statusCode: error.statusCode,
        },
      },
      error.statusCode as any,
    );
  }

  if (error instanceof Error) {
    // Erros do Prisma
    if (error.message.includes('Unique constraint')) {
      return ctx.json(
        {
          error: {
            message: 'Já existe um registro com estes dados',
            statusCode: 409,
          },
        },
        409,
      );
    }

    if (error.message.includes('Foreign key constraint')) {
      return ctx.json(
        {
          error: {
            message: 'Operação inválida: referência a registro inexistente',
            statusCode: 400,
          },
        },
        400,
      );
    }

    // Erro genérico com mensagem
    return ctx.json(
      {
        error: {
          message: error.message || defaultMessage,
          statusCode: 500,
        },
      },
      500,
    );
  }

  // Erro desconhecido
  return ctx.json(
    {
      error: {
        message: defaultMessage,
        statusCode: 500,
      },
    },
    500,
  );
};

/**
 * Handler de validação
 */
export const handleValidation = (
  ctx: Context,
  message: string,
  fields?: Record<string, string[]>,
) => {
  return ctx.json(
    {
      error: {
        message,
        statusCode: 400,
        type: 'ValidationError',
        fields,
      },
    },
    400,
  );
};

/**
 * Handler de recurso não encontrado
 */
export const handleNotFound = (
  ctx: Context,
  resource: string,
  identifier?: string | number,
) => {
  const message = identifier
    ? `${resource} com identificador ${identifier} não encontrado`
    : `${resource} não encontrado`;

  return ctx.json(
    {
      error: {
        message,
        statusCode: 404,
        type: 'NotFoundError',
      },
    },
    404,
  );
};

/**
 * Handler de conflito
 */
export const handleConflict = (ctx: Context, message: string) => {
  return ctx.json(
    {
      error: {
        message,
        statusCode: 409,
        type: 'ConflictError',
      },
    },
    409,
  );
};
