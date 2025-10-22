import { Context, Next } from 'hono';
import { StatusCode } from 'hono/utils/http-status';

interface ErrorWithStatus extends Error {
  status?: StatusCode;
}

// eslint-disable-next-line no-console
const logError = (...args: unknown[]) => console.error(...args);

export const errorHandler = async (c: Context, next: Next) => {
  try {
    await next();
  } catch (err) {
    const error = err as ErrorWithStatus;
    const status = error.status || (500 as StatusCode);

    logError('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    logError('❌ ERROR CAUGHT');
    logError('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    logError('📍 Path:', c.req.method, c.req.url);
    logError('👤 User:', c.get('user'));

    // Tentar ler o body se existir
    try {
      const body = await c.req.json();
      logError('📋 Body:', JSON.stringify(body, null, 2));
    } catch {
      logError('📋 Body: No parseable body');
    }

    logError('🔴 Error:', error.message);
    logError('📚 Stack:', error.stack);
    logError('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    return c.json({
      error: error.message || 'Internal Server Error',
      path: c.req.url,
      timestamp: new Date().toISOString(),
      status: status,
    });
  }
};
