import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setOmr } from '../store/omr';
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
      isOnwer: false,
    };
    dispatch(setOmr(payload));
  }, [dispatch]);

  const { codedEmail } = useParams();
  const { auth, user } = useSelector((state: RootState) => state);
  // 1. url에 있는 이메일을 codedEmail에 담는다
  // 2. 링크 접속시 API 요청한다 (codeEmail 이용)
  // 3. 응답 중 omr_list를 리덕스에 저장(dispatch(setOmrList(response.data.omr_list)))
  // 4-1. isLoggedIn이 True -> OMR 읽기(회원) API 요청
  // 4-2. isLoggedIn이 False -> OMR 읽기(비회원) API 요청
  // 5. 응답 리덕스에 저장하기
  // dispatch(setUser(response.data.user))
  // dispatch(setOmr(response.data.omr))
  useEffect(() => {
    const linkAccess = async () => {
      const response = await OMRApi.omr.linkAccess(codedEmail || '');
      if (response.status === 200) {
        dispatch(setUserInfo(response.data));
        if (auth.isLoggedIn) {
          const secondResponse = await OMRApi.omr.getUserOmr(user.omr_list[0]);
          if (secondResponse.status === 200) {
            dispatch(setUser(secondResponse.data.user));
            dispatch(setOmr(secondResponse.data.omr));
          } else {
            alert('회원정보를 불러오지 못했습니다.');
          }
        } else {
          const secondResponse = await OMRApi.omr.getNotUserOmr(
            user.omr_list[0]
          );
          if (secondResponse.status === 200) {
            dispatch(setUser(secondResponse.data.user));
            dispatch(setOmr(secondResponse.data.omr));
          } else {
            alert('회원정보를 불러오지 못했습니다.');
          }
        }
      } else {
        console.error();
      }
    };
    linkAccess();
  }, [auth.isLoggedIn, codedEmail, dispatch, user.omr_list]);

  return (
    <Container className={styles.screen_container}>
      <OMR />
    </Container>
  );
}

export default CheerPage;
