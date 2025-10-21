import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from './store';

export const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.REACT_APP_API_URL,
  baseUrl: process.env.REACT_APP_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});
