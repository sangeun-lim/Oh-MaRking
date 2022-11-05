import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { setOmr } from '../store/omr';
import { randomOmr } from '../utils/utils';
import OMRApi from '../api/OMRApi';
import OMR from '../components/cheer/OMR';
import { RootState } from '../store/store';
import styles from './CheerPage.module.scss';

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
    dispatch(setOmr(randomOmr()));
  }, [dispatch]);

  const { codedEmail } = useParams();
  // 이렇게 가져오는게 맞나요?
  const { auth, omr } = useSelector((state: RootState) => state);

  const linkAccess = async () => {
    const response = await OMRApi.omr.linkAccess(codedEmail || '');
    if (response.status === 200) {
      dispatch(setOmr(response.data.omr_list[0]));
      // dispatch(setOmrList(response.data.omr_list[0])); ??

      // 4-1
      if (auth.isLoggedIn) {
        // omrId를 넣어줘야되는데?
        // const response = await OMRApi.omr.getUserOmr(omr.omrInfo???)
      }
      // 4-2
      else {
        // const response = await OMRApi.omr.getNotUserOmr(omrId가져와야되는데)
      }
    } else {
      console.error();
    }
  };

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
  );
}

export default CheerPage;
