/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Cheer {
  problemIdx: number;
  elementIdx: number;
}

const initialState = {
  show: false,
  create: false,
  detail: false,
  update: false,
  cantread: false,
  problemIdx: 0,
  elementIdx: 0,
};

const modalReducer = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setShow: (state) => {
      state.show = !state.show;
      if (!state.show) {
        state.create = false;
        state.detail = false;
        state.update = false;
        state.cantread = false;
      }
    },
    setCreate: (state) => {
      state.create = !state.create;
    },
    setDetail: (state) => {
      state.detail = !state.detail;
    },
    setUpdate: (state) => {
      state.update = !state.update;
    },
    setCannotRead: (state) => {
      state.cantread = !state.cantread;
    },
    setCheer(state, action: PayloadAction<Cheer>) {
      state.problemIdx = action.payload.problemIdx;
      state.elementIdx = action.payload.elementIdx;
    },
  },
});

export const {
  setShow,
  setCheer,
  setCreate,
  setDetail,
  setUpdate,
  setCannotRead,
} = modalReducer.actions;
export default modalReducer.reducer;
