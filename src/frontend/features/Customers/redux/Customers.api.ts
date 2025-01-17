import { FetchBaseQueryMeta, createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../commons/redux/baseQuery';
import { ContractResponse } from '../../../commons/interfaces/IMockContract';
import { ICustomer } from '../../Customers/interfaces/ICustomer';
import { downloadFile } from '../../../../utils/downloadFile';

const endpoint = '/api';

export const OrdersApi = createApi({
  reducerPath: 'OrdersApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getCustomerList: builder.query<ContractResponse<ICustomer[]>, void>({
      query: () => ({
        url: `${endpoint}/customers`,
      }),
    }),
    addCustomer: builder.mutation<ContractResponse<boolean>, ICustomer>({
      query: (customer: ICustomer) => ({
        url: `${endpoint}/customer`,
        method: 'POST',
        body: customer,
      }),
    }),
    editCustomer: builder.mutation<
      ContractResponse<boolean>,
      { body: ICustomer }
    >({
      query: ({ body }) => ({
        url: `${endpoint}/customer/${body.id}`,
        method: 'PUT',
        body: body,
      }),
    }),
  }),
});

export const {
  useGetCustomerListQuery,
  useAddCustomerMutation,
  useEditCustomerMutation,
} = OrdersApi;
