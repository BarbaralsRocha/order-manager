import { combineReducers } from '@reduxjs/toolkit';
import { ManageOrdersApi } from '../features/OrderManager/redux/ManageOrders.api';
import { ManagerOrdersReducer } from '../features/OrderManager/redux/slices/ManageOrders.slice';
import { SharedReducer } from './slices/SharedSlice';

export default combineReducers({
  [ManageOrdersApi.reducerPath]: ManageOrdersApi.reducer,
  ManagerOrdersReducer,
  SharedReducer,
});
