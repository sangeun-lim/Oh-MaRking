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
  name: '소정현',
  codedEmail: '',
  introduction: '낭만 소년 소정현입니다.',
  userId: 0,
  omrList: [-1],
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, action: PayloadAction<UserInfo>) {
      // console.log(
      //   '전 state',
      //   state,
      //   state.name,
      //   state.introduction,
      //   state.userId
      // );
      console.log(state.userId, state.omrList[0]);
      console.log('payload', action.payload);
      state.userId = action.payload.userId;
      state.omrList = action.payload.omrList;
      console.log('후 state', state.userId, state.omrList);
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
  },
});

export const { setUser, setUserInfo, setIntro, addOmr } = userReducer.actions;
export default userReducer.reducer;
