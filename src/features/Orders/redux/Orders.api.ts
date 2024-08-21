import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../redux/baseQuery';
import { ContractResponse } from '../../../interfaces/IMockContract';
import { IOrder } from '../interfaces/IOrder.interface';
import { IOptionSelect } from '../../../interfaces/ICommon.interface';
import { ITotalProducts } from '../interfaces/ITotalProducts.interface';

const endpoint = '/order-manager/api/v1';

export const OrdersApi = createApi({
  reducerPath: 'OrdersApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getOrders: builder.query<ContractResponse<IOrder[]>, string>({
      query: (params) => ({
        url: `${endpoint}/orders/summary?${params}`,
      }),
    }),
    getTotalProducts: builder.query<ContractResponse<ITotalProducts[]>, string>(
      {
        query: (params) => ({
          url: `${endpoint}/orders/products/summary?${params}`,
        }),
      },
    ),
    getCustomerList: builder.query<ContractResponse<IOptionSelect[]>, void>({
      query: () => ({
        url: `${endpoint}/orders/customers`,
      }),
    }),
    getProductsList: builder.query<ContractResponse<IOptionSelect[]>, void>({
      query: () => ({
        url: `${endpoint}/orders/products`,
      }),
    }),
    sendOrder: builder.mutation<ContractResponse<boolean>, IOrder>({
      query: (order: IOrder) => ({
        url: `${endpoint}/order`,
        method: 'POST',
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
  }),
});

export const {
  useGetOrdersQuery,
  useGetTotalProductsQuery,
  useGetProductsListQuery,
  useGetCustomerListQuery,
  useSendOrderMutation,
  useDeleteOrderMutation,
} = OrdersApi;
