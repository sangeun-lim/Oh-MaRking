import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { initial } from 'lodash';

// 초기값
// interface User {
//   name: string;
//   coded_email: string;
//   introduction: string;
// }

const initialState = {
  name: '노은영',
  coded_email: '',
  introduction: '안녕하세요',
};

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateIntro: (state, action: PayloadAction<string>) => {
      // eslint-disable-next-line no-param-reassign
      state.introduction = action.payload;
    },
  },
});

export const { updateIntro } = userReducer.actions;
export default userReducer.reducer;

// const nameInitailState = { isLoggined: '', name: '', color: '', token: '' };
