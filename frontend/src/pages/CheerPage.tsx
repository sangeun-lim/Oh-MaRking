import { useEffect, useCallback, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { setIsOwner, setOmr, setIsLoading } from '../store/omr';
import { setUserInfo, setUser } from '../store/user';
import OMRApi from '../api/OMRApi';
import OMR from '../components/cheer/OMR';
import { RootState } from '../store/store';
import styles from './CheerPage.module.scss';
import 'react-toastify/dist/ReactToastify.css';

function CheerPage(): JSX.Element {
  const dispatch = useDispatch();

  const { codedEmail } = useParams();
  const { auth, user, omr } = useSelector((state: RootState) => state);

  const linkAccess = useCallback(async () => {
    try {
      const { status, data } = await OMRApi.omr.linkAccess(codedEmail || '');
      if (status === 200) {
        dispatch(setUserInfo(data.data));
      }
    } catch {
      console.error();
    }
  }, [dispatch, codedEmail]);

  // 처음 렌더링 될 때 -> 링크 접속 API 요청
  useEffect(() => {
    linkAccess();
    dispatch(setIsLoading(true));
  }, [linkAccess, dispatch]);

  // Omr id 받아왔을 때 -> Omr 정보 API 요청
  useEffect(() => {
    if (omr.isLoading && user.omrList[omr.pageNum] !== -1) {
      OMRApi.omr
        .getOmr(user.omrList[omr.pageNum], auth.isLoggedIn)
        .then(({ data }) => {
          dispatch(setUser(data.data.user));
          dispatch(setOmr(data.data.omr));
          dispatch(setIsOwner(data.data.isOwner));
        });
    }
  }, [omr.isLoading, user.omrList, omr.pageNum, auth.isLoggedIn, dispatch]);

  return (
    <Container className={styles.screen_container}>
      {omr.isLoading ? (
        <div className={styles.spinner}>
          <div />
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <>
          <OMR />
          <ToastContainer />
        </>
      )}
    </Container>
  );
}

export default CheerPage;
