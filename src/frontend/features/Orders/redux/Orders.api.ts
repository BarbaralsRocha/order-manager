import { FetchBaseQueryMeta, createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../commons/redux/baseQuery';
import { ContractResponse } from '../../../commons/interfaces/IMockContract';
import { IOrder } from '../interfaces/IOrder.interface';
import { IOptionSelect } from '../../../commons/interfaces/ICommon.interface';
import { ITotalProducts } from '../interfaces/ITotalProducts.interface';
import { ICustomer } from '../../Customers/interfaces/ICustomer';
import { downloadFile } from '../../../../utils/downloadFile';

const endpoint = '/api';

export const OrdersApi = createApi({
  reducerPath: 'OrdersApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getOrders: builder.query<ContractResponse<IOrder[]>, string>({
      query: (params) => ({
        url: `${endpoint}/orders`,
      }),
    }),
    getTotalProducts: builder.query<ContractResponse<ITotalProducts[]>, string>(
      {
        query: (params) => ({
          url: `${endpoint}/orders/totals?${params}`,
        }),
      },
    ),
    getCustomerList: builder.query<ContractResponse<ICustomer[]>, void>({
      query: () => ({
        url: `${endpoint}/customers`,
      }),
    }),
    sendOrder: builder.mutation<ContractResponse<boolean>, IOrder>({
      query: (order: IOrder) => ({
        url: `${endpoint}/order`,
        method: 'POST',
        body: order,
      }),
    }),
    editOrder: builder.mutation<ContractResponse<boolean>, IOrder>({
      query: (order: IOrder) => ({
        url: `${endpoint}/order/${order.id}`,
        method: 'PUT',
        body: order,
      }),
    }),
    deleteOrder: builder.mutation<
      ContractResponse<boolean>,
      { orderId: number }
    >({
      query: ({ orderId }) => ({
        url: `${endpoint}/order/${orderId}`,
        method: 'DELETE',
      }),
    }),
    downloadOrders: builder.mutation<null, void>({
      query: () => ({
        url: `${endpoint}/orders/export`,
        method: 'GET',
        responseHandler: (response: Response) => response?.blob(),
      }),
      transformResponse: (
        response: Blob,
        meta: FetchBaseQueryMeta,
        arg,
      ): null => {
        downloadFile('Pedidos', response as Blob);
        return null;
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetTotalProductsQuery,
  useGetCustomerListQuery,
  useSendOrderMutation,
  useDeleteOrderMutation,
  useEditOrderMutation,
  useDownloadOrdersMutation,
} = OrdersApi;
