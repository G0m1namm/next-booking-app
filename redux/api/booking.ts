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
    initStripeCheckout: builder.query({
      query: ({ id, ...body}) => ({
        url: `/payment/checkout_session/${id}`,
        params: {
          ...body
        },
      }),
    }),
    getSalesStats: builder.query({
      query: (params) => ({
        url: '/admin/sales_stats',
        params,
      }),
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useLazyCheckBookingAvailabilityQuery,
  useGetAllBookedDaysQuery,
  useLazyInitStripeCheckoutQuery,
  useLazyGetSalesStatsQuery
} = bookinApi;
