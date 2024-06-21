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
    checkBookingAvailability: builder.query({
      query: ({ id, checkInDate, checkOutDate }) => ({
        url: '/booking/check',
        params: {
          id,
          checkInDate,
          checkOutDate,
        },
      }),
    }),
    getAllBookedDays: builder.query({
      query: ({ roomId }) => ({
        url: '/booking/all-booked-days',
        params: {
          roomId,
        },
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useLazyCheckBookingAvailabilityQuery,
  useGetAllBookedDaysQuery,
} = bookinApi;
