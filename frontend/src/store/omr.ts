/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Note {
  problemIdx: number;
  elementIdx: number;
  status: number;
}

const initialState = {
  color: -1,
  pageNum: -1,
  omrInfo: [[-1]],
  noteInfo: [[-1]],
  isOnwer: false,
};

const omrReducer = createSlice({
  name: 'omr',
  initialState,
  reducers: {
    setOmr(state, action: PayloadAction<number[][]>) {
      state.omrInfo = action.payload;
    },
    changePage(state, action: PayloadAction<number>) {
      state.pageNum = action.payload;
    },
    changeNote(state, action: PayloadAction<Note>) {
      const { problemIdx, elementIdx, status } = action.payload;
      state.omrInfo[problemIdx][elementIdx] = status;
    },
  },
});

export const { setOmr, changePage, changeNote } = omrReducer.actions;
export default omrReducer.reducer;
