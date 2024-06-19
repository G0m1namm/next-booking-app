import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const passwordApi = createApi({
  reducerPath: 'passwordApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: '/password/forgot',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, ...body }) => ({
        url: `/password/reset/${token}`,
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const { useForgotPasswordMutation, useResetPasswordMutation } = passwordApi;
