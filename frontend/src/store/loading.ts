import { createSlice } from '@reduxjs/toolkit';

const loadingReducer = createSlice({
  name: 'isLoading',
  initialState: false,
  reducers: {
    toggle(state: boolean) {
      return !state;
    },
  },
});

export const loadingActions = loadingReducer.actions;
export default loadingReducer.reducer;
