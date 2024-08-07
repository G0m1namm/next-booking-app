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
    createRoom: builder.mutation({
      query: (body) => ({
        url: '/admin/rooms/new',
        method: 'POST',
        body
      }),
    }),
    updateRoom: builder.mutation({
      query: ({ id, ...body}) => ({
        url: `/admin/rooms/${id}`,
        method: 'PUT',
        body
      }),
    }),
  }),
});

export const {
    useCreateReviewMutation,
    useCheckCanReviewQuery,
    useCreateRoomMutation,
    useUpdateRoomMutation
} = roomApi;
