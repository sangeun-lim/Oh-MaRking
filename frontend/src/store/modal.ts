/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface Modal {
//   pass: boolean;
//   show: boolean;
// }

const initialState = {
  pass: false,
  show: false,
};

const modalReducer = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setPass(state, action: PayloadAction<boolean>) {
      state.pass = action.payload;
    },
    setShow(state, action: PayloadAction<boolean>) {
      state.show = action.payload;
    },
    // setPass(state) {
    //   state.pass = !state.pass;
    // },
    // setShow(state) {
    //   state.show = !state.show;
    // },
  },
});

export const { setPass, setShow } = modalReducer.actions;
export default modalReducer.reducer;
