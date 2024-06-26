import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (body) => ({
        url: '/me/update',
        method: 'PUT',
        body,
      }),
    }),
    updateSession: builder.query({
      query: () => ({
        url: '/auth/session',
      }),
    }),
    updatePassword: builder.mutation({
      query: (body) => ({
        url: '/me/update_password',
        method: 'PUT',
        body,
      }),
    }),
    updateAvatar: builder.mutation({
      query: (body) => ({
        url: '/me/update_avatar?update=true',
        method: 'PUT',
        body,
      }),
    }),
  }),
});

export const {
  useUpdateProfileMutation,
  useLazyUpdateSessionQuery,
  useUpdatePasswordMutation,
  useUpdateAvatarMutation,
} = userApi;
