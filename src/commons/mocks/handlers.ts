import { handlerOrderManager } from '../../features/OrderManager/mocks/handlerOrderManager';
import { handlerOrder } from '../../features/Orders/mocks/handlerOrder';
import { handlerProducts } from '../../features/Products/mocks/handlerProducts';

export const handlers = [
  ...handlerOrderManager,
  ...handlerOrder,
  ...handlerProducts,
];
