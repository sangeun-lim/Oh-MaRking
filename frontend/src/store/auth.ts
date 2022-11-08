/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSessionStorage, deleteSessionStorage } from '../utils/utils';

const initialState = {
  isLoggedIn: !!getSessionStorage('refreshToken'),
  myCodedEmail: '',
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
    setMyCodedEmail(state, action: PayloadAction<string>) {
      state.myCodedEmail = action.payload;
    },
  },
});

export const { login, logout, setMyCodedEmail } = authReducer.actions;
export default authReducer.reducer;
