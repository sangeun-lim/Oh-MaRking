import { createSlice } from '@reduxjs/toolkit';

// 초기값
const nowColorInitialState = 0;

const nowColorReducer = createSlice({
  name: 'nowColor',
  initialState: nowColorInitialState,
  reducers: {
    changeColor(state: number, actions: { type: string; payload: number }) {
      return actions.payload;
    },
  },
});

export const { changeColor } = nowColorReducer.actions;
export default nowColorReducer.reducer;

// const store = configureStore({
//   reducer: {
//     newColor: nowColorSlice.reducer,
//   },
// });

// export const newColorActions = nowColorSlice.actions;

// export default store;
