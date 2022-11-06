import { useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setIsOwner, setOmr } from '../store/omr';
import { setUserInfo, setUser } from '../store/user';
import { randomOmr } from '../utils/utils';
import OMRApi from '../api/OMRApi';
import OMR from '../components/cheer/OMR';
import { RootState } from '../store/store';
import styles from './CheerPage.module.scss';

function CheerPage(): JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      color: 0,
      pageNum: 1,
      omrInfo: randomOmr(5),
      noteInfo: randomOmr(50),
      isOwner: false,
    };
    dispatch(setOmr(payload));
  }, [dispatch]);

  const { codedEmail } = useParams();
  const { auth, user, omr } = useSelector((state: RootState) => state);

  const linkAccess = async () => {
    const response = await OMRApi.omr.linkAccess(codedEmail || '');
    if (response.status === 200) {
      dispatch(setUserInfo(response.data.data));
    } else {
      console.error();
    }
  };

  const getUserOmr = useCallback(async () => {
    const { status, data } = await OMRApi.omr.getUserOmr(user.omrList[0]);
    if (status === 200) {
      console.log(data);
      dispatch(setUser(data.data.user));
      dispatch(setOmr(data.data.omr));
      dispatch(setIsOwner(data.data.isOwner));
    } else {
      alert('회원정보를 불러오지 못했습니다.');
    }
  }, [dispatch, user.omrList]);

  const getNotUserOmr = useCallback(async () => {
    const { status, data } = await OMRApi.omr.getNotUserOmr(user.omrList[0]);
    if (status === 200) {
      dispatch(setUser(data.data.user));
      dispatch(setOmr(data.data.omr));
      dispatch(setIsOwner(data.data.isOwner));
    } else {
      alert('회원정보를 불러오지 못했습니다.');
    }
  }, [dispatch, user.omrList]);

  // 처음 렌더링 될 때 -> 링크 접속 API 요청
  useEffect(() => {
    linkAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Omr id 받아왔을 때 -> Omr 정보 API 요청
  useEffect(() => {
    if (user.omrList[0] !== -1) {
      if (auth.isLoggedIn) {
        getUserOmr();
      } else {
        getNotUserOmr();
      }
    }
  }, [user.omrList, auth.isLoggedIn, getNotUserOmr, getUserOmr]);

  return (
    <Container className={styles.screen_container}>
      <OMR />
    </Container>
  );
}

export default CheerPage;
