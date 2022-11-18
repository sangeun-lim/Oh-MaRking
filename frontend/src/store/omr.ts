/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Omr {
  color: number;
  pageNum: number; // 현재 페이지 숫자
  omrInfo: number[][];
  noteInfo: number[][];
  nicknameInfo: string[][];
  showDateInfo: string[][];
  isOwner: boolean;
}

interface Note {
  problemIdx: number;
  elementIdx: number;
}

const initialState = {
  pageNum: 0, // 현재 페이지 인덱스
  color: 0,
  omrInfo: [[-1]],
  noteInfo: [[-1]],
  nicknameInfo: [['']],
  showDateInfo: [['']],
  isOwner: false,
  isLoading: true,
};

const omrReducer = createSlice({
  name: 'omr',
  initialState,
  reducers: {
    // omr 정보 저장
    setOmr(state, action: PayloadAction<Omr>) {
      return { ...action.payload, isLoading: false };
    },
    // 페이지 이동 시 pageNum 바꿔주기
    setPage(state, action: PayloadAction<number>) {
      state.pageNum = action.payload;
    },
    // 안 읽은 노트 읽음처리하기
    setNoteOpen(state, action: PayloadAction<Note>) {
      const { problemIdx, elementIdx } = action.payload;
      const status =
        state.omrInfo[problemIdx][elementIdx] === 2
          ? 1
          : state.omrInfo[problemIdx][elementIdx];
      state.omrInfo[problemIdx][elementIdx] = status;
    },
    // 색깔 바꾸기
    setColor(state, action: PayloadAction<number>) {
      state.color = action.payload;
    },
    setIsOwner(state, action: PayloadAction<boolean>) {
      state.isOwner = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    // 즐겨찾기 처리
    setNoteLike(state, action: PayloadAction<Note>) {
      const { problemIdx, elementIdx } = action.payload;
      const status = state.omrInfo[problemIdx][elementIdx] === 1 ? 4 : 1;
      state.omrInfo[problemIdx][elementIdx] = status;
    },
  },
});

export const {
  setOmr,
  setPage,
  setNoteOpen,
  setColor,
  setIsOwner,
  setIsLoading,
  setNoteLike,
} = omrReducer.actions;
export default omrReducer.reducer;
