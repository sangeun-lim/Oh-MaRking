/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSessionStorage, deleteSessionStorage } from '../utils/utils';

const initialState = {
  isLoggedIn: !!getSessionStorage('refreshToken'),
  isOwner: false,
};

const userReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    logOut: (state) => {
      deleteSessionStorage('accessToken');
      deleteSessionStorage('refreshToken');
      state.isLoggedIn = !!getSessionStorage('refreshToken');
    },
    checkOwner: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload;
    },
  },
});

export const { logIn, logOut, checkOwner } = userReducer.actions;
export default userReducer.reducer;
