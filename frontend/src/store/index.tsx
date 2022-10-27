// redux 컴포넌트
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal';

// 만든 reducer 추가해주기
export default configureStore({
  reducer: {
    modal: modalReducer,
  },
});
