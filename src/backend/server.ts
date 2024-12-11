import app from './app';
import { serve } from 'bun';

const port = 4000;

serve({
  port,
  fetch: app.fetch, // Hono usa `app.fetch` para gerenciar requisições
});

console.log(`Backend is running at http://localhost:${port}`);
