import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const bookinApi = createApi({
  reducerPath: 'bookinApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (body) => ({
        url: '/booking/new',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateBookingMutation } = bookinApi;
