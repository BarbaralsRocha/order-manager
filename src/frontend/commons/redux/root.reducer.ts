import { combineReducers } from '@reduxjs/toolkit';
import { ManageOrdersApi } from '../../features/OrderManager/redux/ManageOrders.api';
import { OrdersApi } from '../../features/Orders/redux/Orders.api';
import { ProductsApi } from '../../features/Products/redux/Products.api';
import { ManagerOrdersReducer } from '../../features/OrderManager/redux/slices/ManageOrders.slice';
import { SharedReducer } from './slices/SharedSlice';

export default combineReducers({
  [ManageOrdersApi.reducerPath]: ManageOrdersApi.reducer,
  [OrdersApi.reducerPath]: OrdersApi.reducer,
  [ProductsApi.reducerPath]: ProductsApi.reducer,
  ManagerOrdersReducer,
  SharedReducer,
});
