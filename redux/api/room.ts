import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const roomApi = createApi({
  reducerPath: 'roomApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (body) => ({
        url: '/reviews',
        method: 'PUT',
        body,
      }),
    }),
    checkCanReview: builder.query({
      query: (body) => ({
        url: '/reviews/can_review',
        params: {
          ...body,
        }
      }),
    }),
  }),
});

export const {
    useCreateReviewMutation,
    useCheckCanReviewQuery
} = roomApi;
