import { createSlice } from '@reduxjs/toolkit';

// 초기값
const initialState = { nowColor: null };

export const nowColorReducer = createSlice({
  name: 'nowColor',
  initialState: initialState ,
  reducers: {
    chageNowColor: (state) => {
      state.nowColor = state.nowColor;
    },
  },
});
export const { chageNowColor } = nowColorReducer.actions;
export default nowColorReducer.reducer;
