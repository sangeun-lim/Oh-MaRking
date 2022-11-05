/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기값
interface User {
  name: string;
  coded_email: string;
  introduction: string;
}

interface UserInfo {
  user_id: number;
  omr_list: number[];
}

const initialState = {
  name: '소정현',
  coded_email: '',
  introduction: '낭만 소년 소정현입니다.',
  user_id: 0,
  omr_list: [-1],
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.name = action.payload.name;
      state.coded_email = action.payload.coded_email;
      state.introduction = action.payload.introduction;
    },
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.user_id = action.payload.user_id;
      state.omr_list = action.payload.omr_list;
    },
    setIntro(state, action: PayloadAction<string>) {
      state.introduction = action.payload;
    },
    addOmr(state, action: PayloadAction<number>) {
      state.omr_list.push(action.payload);
    },
  },
});

export const { setUser, setUserInfo, setIntro, addOmr } = userReducer.actions;
export default userReducer.reducer;
