/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기값
interface User {
  name: string;
  codedEmail: string;
  introduction: string;
}

interface UserInfo {
  userId: number;
  omrList: number[];
}

const initialState = {
  name: '',
  codedEmail: '',
  introduction: '',
  userId: 0,
  omrList: [-1],
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      state.userId = action.payload.userId;
      state.omrList = action.payload.omrList;
    },
    setUser(state, action: PayloadAction<User>) {
      state.name = action.payload.name;
      state.codedEmail = action.payload.codedEmail;
      state.introduction = action.payload.introduction;
    },
    setIntro(state, action: PayloadAction<string>) {
      state.introduction = action.payload;
    },
    addOmr(state, action: PayloadAction<number>) {
      state.omrList.push(action.payload);
    },
    setCodedEmail(state, action: PayloadAction<string>) {
      state.codedEmail = action.payload;
    },
  },
});

export const { setUser, setUserInfo, setIntro, addOmr, setCodedEmail } =
  userReducer.actions;
export default userReducer.reducer;
