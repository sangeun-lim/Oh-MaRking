/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기값
interface Note {
  nickname: string;
  content: string;
  show_date: string;
  date: string;
  problem_num: number;
  check_num: number;
  isFavorite: number;
}

const initialState = {
  nickname: '',
  content: '',
  show_date: '',
  date: '',
  problem_num: -1,
  check_num: -1,
  isFavorite: -1,
};

const noteReducer = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNote(state, action: PayloadAction<Note>) {
      state = action.payload;
    },
  },
});

export const { setNote } = noteReducer.actions;
export default noteReducer.reducer;
