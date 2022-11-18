/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { likeList } from '../utils/Interface';

const initialState: { likeList: likeList[] } = {
  likeList: [],
};

const likeListReducer = createSlice({
  name: 'likeList',
  initialState,
  reducers: {
    setLikeList(state, action: PayloadAction<likeList[]>) {
      state.likeList = action.payload;
    },
    addLikeList(state, action: PayloadAction<likeList>) {
      state.likeList = [action.payload, ...state.likeList];
    },
    removeLikeItem(state, action: PayloadAction<number>) {
      state.likeList = state.likeList.filter(
        (likeItem) => likeItem.noteId !== action.payload
      );
    },
  },
});

export const { setLikeList, addLikeList, removeLikeItem } =
  likeListReducer.actions;
export default likeListReducer.reducer;
