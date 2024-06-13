import { IUser } from '@/backend/models/user';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type IUserClient = Omit<
  IUser,
  'createdAt' | 'resetPasswordToken' | 'resetPasswordExpire'
>;

interface IUserState {
  user: null | IUserClient;
  isAuthenticated: boolean;
}

const initialState: IUserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state: IUserState, action: PayloadAction<IUserClient>) => {
      state.user = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setUser, setIsAuthenticated } = userSlice.actions;
export default userSlice.reducer;
