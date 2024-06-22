import { combineReducers } from '@reduxjs/toolkit';
import { ManageOrdersApi } from './ManageOrders.api';

export default combineReducers({
  [ManageOrdersApi.reducerPath]: ManageOrdersApi.reducer,
});
