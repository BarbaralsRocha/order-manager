import { handlers } from '../features/OrderManager/mocks/handler';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...handlers);
