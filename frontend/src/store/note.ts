/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 초기값
interface Note {
  nickname: string;
  content: string;
  showDate: string;
  date: string;
  problemNum: number;
  checkNum: number;
  isFavorite: boolean;
}

const initialState = {
  nickname: '',
  content: '',
  showDate: '',
  date: '',
  problemNum: -1,
  checkNum: -1,
  isFavorite: false,
};

const noteReducer = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNote(state, action: PayloadAction<Note>) {
      return action.payload;
    },
    setFavorite(state, action: PayloadAction<boolean>) {
      // state.isFavorite = !action.payload;
      state.isFavorite = action.payload;
    },
  },
});

export const { setNote, setFavorite } = noteReducer.actions;
export default noteReducer.reducer;
