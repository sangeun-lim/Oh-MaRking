import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useDispatch } from 'react-redux';
import { setOmr } from '../store/omr';
import { randomOmr } from '../utils/utils';
// import { useParams } from 'react-router-dom';
// import OMRApi from '../api/OMRApi';

import styles from './CheerPage.module.scss';
import OMR from '../components/cheer/OMR';
// import { useEffect } from 'react';

function CheerPage(): JSX.Element {
  // 1. url에 있는 이메일을 codedEmail에 담는다
  // 2. 링크 접속시 API 요청한다 (codeEmail 이용)
  // 3. 응답 중 omr_list를 리덕스에 저장(dispatch(setOmrList(response.data.omr_list)))
  // 4-1. isLoggedIn이 True -> OMR 읽기(회원) API 요청
  // 4-2. isLoggedIn이 False -> OMR 읽기(비회원) API 요청
  // 5. 응답 리덕스에 저장하기
  // dispatch(setUser(response.data.user))
  // dispatch(setOmr(response.data.omr))

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

  // const { codedEmail } = useParams();

  // const linkAccess = async () => {
  //   const response = await OMRApi.omr.linkAccess(codedEmail || '');
  //   if (response.status === 200) {
  //     setOmrId(response.data.omr_list[0])
  //   }
  // };
  // const OmrUserRead = async () => {
  //   const response = await OMRApi.omr.getUserOmr(omrId);
  //   if (response.status === 200) {

  //   }
  // };

  // const OmrNotUserRead = async () => {
  //   const response = await OMRApi.omr.getNotUserOmr(omrId);
  //   if ( response.status === 200){

  //   }
  // }

  // useEffect(() => {
  //   const linkAccess = async () => {
  //     const response = await OMRApi.omr.linkAccess(codedEmail || '');
  //     if (response.status === 200) {
  //       // dispatch로 response.data의 값을 넘겨준다.
  //     }
  //   };
  //   linkAccess();
  // }, [codedEmail]);

  return (
    <Container className={styles.screen_container}>
      <OMR />
    </Container>
    // <div className={styles.container}>
    //   <OMR />
    // </div>
  );
}

export default CheerPage;
