import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../../commons/redux/baseQuery';
import { ContractResponse } from '../../../commons/interfaces/IMockContract';
import { IProduct } from '../utils/interfaces/IProduct';

const endpoint = 'api';

export const ProductsApi = createApi({
  reducerPath: 'ProductsApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getProducts: builder.query<ContractResponse<IProduct[]>, string | void>({
      query: (params) => ({
        url: `${endpoint}/products`,
      }),
    }),
    addProduct: builder.mutation<ContractResponse<boolean>, IProduct>({
      query: (product: IProduct) => ({
        url: `${endpoint}/product`,
        method: 'POST',
        body: product,
      }),
    }),
    editProduct: builder.mutation<
      ContractResponse<boolean>,
      { body: IProduct }
    >({
      query: ({ body }) => ({
        url: `${endpoint}/product/${body.id}`,
        method: 'PUT',
        body: body,
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
  useEditProductMutation,
} = ProductsApi;
