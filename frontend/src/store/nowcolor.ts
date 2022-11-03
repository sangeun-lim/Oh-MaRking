import { createSlice } from '@reduxjs/toolkit';

const nowColorReducer = createSlice({
  name: 'nowColor',
  initialState: 0,
  reducers: {
    changeColor(state: number, actions: { type: string; payload: number }) {
      return actions.payload;
    },
  },
});

export const { changeColor } = nowColorReducer.actions;
export default nowColorReducer.reducer;
