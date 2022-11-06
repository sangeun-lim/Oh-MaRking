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
      isOwner: false,
    };
    dispatch(setOmr(payload));
  }, [dispatch]);

  const { codedEmail } = useParams();
  const { auth, user, omr } = useSelector((state: RootState) => state);

  const linkAccess = async () => {
    console.log('linkAccess 요청');
    const response = await OMRApi.omr.linkAccess(codedEmail || '');
    console.log('linkAccess 요청');
    if (response.status === 200) {
      console.log('response', response);
      console.log('response.data.data', response.data.data);
      dispatch(setUserInfo(response.data.data));
      const saveUserInfo = () => {
        return new Promise<void>(() => {
          dispatch(setUserInfo(response.data.data));
        });
      };
      saveUserInfo.then(() =>{

        
        
        // 회원일 때
        if (auth.isLoggedIn) {
          const secondResponse = await OMRApi.omr.getUserOmr(user.omrList[0]);
          if (secondResponse.status === 200) {
            dispatch(setUser(secondResponse.data.user));
            dispatch(setOmr(secondResponse.data.omr));
          } else {
            alert('회원정보를 불러오지 못했습니다.');
          }
          // 비회원일 때
        } else {
          const secondResponse = await OMRApi.omr.getNotUserOmr(user.omrList[0]);
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
    });
    };
    
    useEffect(() => {
      linkAccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className={styles.screen_container}>
      <OMR />
    </Container>
  );
}

export default CheerPage;
