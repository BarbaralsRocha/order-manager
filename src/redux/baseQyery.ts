import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
  baseUrl: 'teste',
  prepareHeaders: (headers) => {
    headers.set('Authorization', 'Bearer 123');
    return headers;
  },
});
