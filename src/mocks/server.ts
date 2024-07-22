import { setupServer } from 'msw/node';
import { handlers } from '../features/OrderManager/mocks/handler';

export const server = setupServer(...handlers);
