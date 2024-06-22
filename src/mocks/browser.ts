import { handlers } from './handler';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...handlers);
