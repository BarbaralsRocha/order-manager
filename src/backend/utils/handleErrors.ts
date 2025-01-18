import { Context } from 'hono';

export const handleError = (c: Context, error: unknown, message: string) => {
  console.error(error);
  return c.json({ error: message }, 500);
};

export const handleValidation = (c: Context, message: string) =>
  c.json(
    {
      message,
      success: false,
    },
    400,
  );
