import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { setSessionStorage } from '../utils/utils';

function CallBackPage(): JSX.Element {
  const { search } = useLocation();
  const navigate = useNavigate();

  const url = new URLSearchParams(search);

  const accessToken = url.get('accessToken');
  const refreshToken = url.get('refreshToken');

  useEffect(() => {
    if (accessToken && refreshToken) {
      setSessionStorage('accessToken', accessToken);
      setSessionStorage('refreshToken', refreshToken);
    }
  }, [accessToken, refreshToken]);
  return <div />;
}
export default CallBackPage;
