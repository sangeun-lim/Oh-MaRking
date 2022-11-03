import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSessionStorage } from '../utils/utils';

function CallBackPage(): JSX.Element {
  const { search } = useLocation();
  const navigate = useNavigate();

  const url = new URLSearchParams(search);

  const accessToken = url.get('accessToken');
  const refreshToken = url.get('refreshToken');
  const loginUser = 'eunyoung';

  useEffect(() => {
    if (accessToken && refreshToken) {
      setSessionStorage('accessToken', accessToken);
      setSessionStorage('refreshToken', refreshToken);

      // 연결지어 줄 이메일 받아오기 요청쏘기
      const path = 'axios응답.coded_email';
      navigate(`/cheer/${loginUser}`, { replace: true });
    }
  }, [accessToken, refreshToken, loginUser, navigate]);
  return <div />;
}
export default CallBackPage;
