/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSessionStorage, deleteSessionStorage } from '../utils/utils';

const initialState = {
  isLoggedIn: !!getSessionStorage('refreshToken'),
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = !!getSessionStorage('refreshToken');
    },
    logout: (state) => {
      deleteSessionStorage('accessToken');
      deleteSessionStorage('refreshToken');
      state.isLoggedIn = !!getSessionStorage('refreshToken');
    },
  },
});

export const { login, logout } = authReducer.actions;
export default authReducer.reducer;
