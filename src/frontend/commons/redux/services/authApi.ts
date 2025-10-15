import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

interface AuthResponse {
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/api/login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = AuthApi;
