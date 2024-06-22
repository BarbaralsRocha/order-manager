import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQyery';

export const ManageOrdersApi = createApi({
  reducerPath: 'ManageOrdersApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getAllOrders: builder.query<string, void>({
      query: () => ({ url: 'https://example.com/user' }),
    }),
  }),
});

export const { useGetAllOrdersQuery } = ManageOrdersApi;
