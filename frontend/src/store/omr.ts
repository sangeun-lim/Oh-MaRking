/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Omr {
  color: number;
  pageNum: number; // 현재 페이지 숫자
  omrInfo: number[][];
  noteInfo: number[][];
  isOwner: boolean;
}

interface Note {
  problemIdx: number;
  elementIdx: number;
  status: number;
}

const initialState = {
  pageNum: -1, // 현재 페이지 인덱스
  color: 0,
  omrInfo: [[-1]],
  noteInfo: [[-1]],
  isOwner: false,
};

const omrReducer = createSlice({
  name: 'omr',
  initialState,
  reducers: {
    // omr 정보 저장
    setOmr(state, action: PayloadAction<Omr>) {
      return action.payload;
    },
    // 페이지 이동 시 pageNum 바꿔주기
    setPage(state, action: PayloadAction<number>) {
      state.pageNum = action.payload;
    },
    // 노트 상태 바꾸기
    setNoteStatus(state, action: PayloadAction<Note>) {
      const { problemIdx, elementIdx, status } = action.payload;
      state.omrInfo[problemIdx][elementIdx] = status;
    },
    // 색깔 바꾸기
    setColor(state, action: PayloadAction<number>) {
      state.color = action.payload;
    },
    //
    setIsOwner(state, action: PayloadAction<boolean>) {
      state.isOwner = action.payload;
    },
  },
});

export const { setOmr, setPage, setNoteStatus, setColor, setIsOwner } =
  omrReducer.actions;
export default omrReducer.reducer;
