import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthApi from '../api/AuthApi';
import { RootState } from '../store/store';
import { setCodedEmail } from '../store/user';
import Router from './Router';
import styles from './App.module.scss';

function App(): JSX.Element {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);

  const getCodedEmail = useCallback(async () => {
    const { status, data } = await AuthApi.auth.getCodedEmail();
    if (status === 200) {
      console.log(data);
      dispatch(setCodedEmail(data.data.codedEmail));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      getCodedEmail();
    }
  }, [isLoggedIn, getCodedEmail]);
  return (
    <div className={styles.image}>
      <Router />
    </div>
  );
}

export default App;
