import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../redux/baseQuery';
import { ContractResponse } from '../../../interfaces/IMockContract';
import { IProduct } from '../utils/interfaces/IProduct';

const endpoint = '/order-manager/api/v1';

export const ProductsApi = createApi({
  reducerPath: 'ProductsApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getProducts: builder.query<ContractResponse<IProduct[]>, string>({
      query: (params) => ({
        url: `${endpoint}/products/summary?${params}`,
      }),
    }),
    addProduct: builder.mutation<ContractResponse<boolean>, IProduct>({
      query: (order: IProduct) => ({
        url: `${endpoint}/product`,
        method: 'POST',
        body: order,
      }),
    }),
    deleteProduct: builder.mutation<
      ContractResponse<boolean>,
      { productId: number }
    >({
      query: ({ productId }) => ({
        url: `${endpoint}/product/${productId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
} = ProductsApi;
