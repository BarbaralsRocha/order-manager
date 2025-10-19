import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../baseQuery';

interface User {
  id: string;
  email: string;
}

interface ValidateTokenResponse {
  user: User;
}

interface Auth0CallbackRequest {
  sub: string;
  email: string;
}

export const AuthApi = createApi({
  reducerPath: 'AuthApi',
  baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    validateToken: builder.query<ValidateTokenResponse, void>({
      query: () => ({
        url: '/api/validate-token',
        method: 'GET',
      }),
    }),
    auth0Callback: builder.mutation<{ user: User }, Auth0CallbackRequest>({
      query: (auth0User) => ({
        url: '/api/auth0-callback',
        method: 'POST',
        body: auth0User,
      }),
    }),
  }),
});

export const { useValidateTokenQuery, useAuth0CallbackMutation } = AuthApi;
