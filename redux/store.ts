import { configureStore } from '@reduxjs/toolkit';

import { authApi } from './api/auth';
import { bookinApi } from './api/booking';
import { passwordApi } from './api/password';
import { userApi } from './api/user';
import breadcrumbsReducer from './features/breadcrumbs/breadcrumbs-slice';
import userReducer from './features/user/user-slice';
import { roomApi } from './api/room';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    breadcrumbs: breadcrumbsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [passwordApi.reducerPath]: passwordApi.reducer,
    [bookinApi.reducerPath]: bookinApi.reducer,
    [roomApi.reducerPath]: roomApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      passwordApi.middleware,
      bookinApi.middleware,
      roomApi.middleware,
    ]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
