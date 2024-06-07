import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/auth';
import breadcrumbsReducer from './features/breadcrumbs/breadcrumbs-slice';
import userReducer from './features/user/user-slice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    breadcrumbs: breadcrumbsReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([authApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
