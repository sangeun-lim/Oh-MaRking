import { createSlice } from '@reduxjs/toolkit';

// 초기값
const initialState = { modal: false };

export const modalReducer = createSlice({
  name: 'share',
  initialState: { value: initialState },
  reducers: {
    toggleModal: (state) => {
      state.value.modal = !state.value.modal;
    },
  },
});
export const { toggleModal } = modalReducer.actions;
export default modalReducer.reducer;
