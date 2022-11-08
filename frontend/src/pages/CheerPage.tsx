import { useEffect, useCallback, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setIsOwner, setOmr, setIsLoading } from '../store/omr';
import { setUserInfo, setUser } from '../store/user';
import OMRApi from '../api/OMRApi';
import OMR from '../components/cheer/OMR';
import { RootState } from '../store/store';
import styles from './CheerPage.module.scss';

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

  const getOmr = useCallback(
    async (omrId: number) => {
      console.log('쏨');
      const { status, data } = auth.isLoggedIn
        ? await OMRApi.omr.getUserOmr(omrId)
        : await OMRApi.omr.getNotUserOmr(omrId);
      if (status === 200) {
        dispatch(setUser(data.data.user));
        dispatch(setOmr(data.data.omr));
        dispatch(setIsOwner(data.data.isOwner));
      }
    },
    [auth.isLoggedIn, dispatch]
  );

  // const getUserOmr = useCallback(async () => {
  //   const { status, data } = await OMRApi.omr.getUserOmr(user.omrList[0]);
  //   if (status === 200) {
  //     dispatch(setUser(data.data.user));
  //     dispatch(setOmr(data.data.omr));
  //     dispatch(setIsOwner(data.data.isOwner));
  //   } else {
  //     alert('회원정보를 불러오지 못했습니다.');
  //   }
  // }, [dispatch, user.omrList]);

  // const getNotUserOmr = useCallback(async () => {
  //   const { status, data } = await OMRApi.omr.getNotUserOmr(user.omrList[0]);
  //   if (status === 200) {
  //     dispatch(setUser(data.data.user));
  //     dispatch(setOmr(data.data.omr));
  //     dispatch(setIsOwner(data.data.isOwner));
  //   } else {
  //     alert('회원정보를 불러오지 못했습니다.');
  //   }
  // }, [dispatch, user.omrList]);

  // 처음 렌더링 될 때 -> 링크 접속 API 요청
  useEffect(() => {
    console.log('linkAccess');
    linkAccess();
    dispatch(setIsLoading(true));
    // .then(() => {
    //   getOmr(user.omrList[0]);
    //   console.log('cherr', omr.isLoading);
    // });
  }, [linkAccess, dispatch]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // Omr id 받아왔을 때 -> Omr 정보 API 요청

  useEffect(() => {
    console.log('isloading', omr.isLoading, omr.pageNum);
    if (omr.isLoading && user.omrList[omr.pageNum] !== -1) {
      console.log('통과isloading', user.omrList[omr.pageNum]);
      getOmr(user.omrList[omr.pageNum]);
    }
  }, [omr.isLoading, user.omrList, omr.pageNum, getOmr]);

  return (
    <Container className={styles.screen_container}>
      {omr.isLoading ? (
        <div className={styles.spinner}>
          <div />
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <OMR />
      )}
    </Container>
  );
}

export default CheerPage;
