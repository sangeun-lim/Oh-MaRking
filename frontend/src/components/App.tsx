import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthApi from '../api/AuthApi';
import { RootState } from '../store/store';
import { setMyCodedEmail } from '../store/auth';
import Router from './Router';
import styles from './App.module.scss';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const getCodedEmail = useCallback(async () => {
    const { status, data } = await AuthApi.auth.getCodedEmail();
    if (status === 200) {
      dispatch(setMyCodedEmail(data.data.codedEmail));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      // getCodedEmail();
    }
  }, [isLoggedIn, getCodedEmail]);
  return (
    <div className={`${styles.image} ${styles.custom_cursor}`}>
      <Router />
    </div>
  );
}

export default App;
