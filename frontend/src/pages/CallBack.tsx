import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../store/auth';
import { setSessionStorage } from '../utils/utils';

function CallBackPage(): JSX.Element {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = new URLSearchParams(search);

  const accessToken = url.get('accessToken');
  const refreshToken = url.get('refreshToken');
  const codedEmail = url.get('coded_email');

  useEffect(() => {
    if (accessToken && refreshToken) {
      setSessionStorage('accessToken', accessToken);
      setSessionStorage('refreshToken', refreshToken);
      dispatch(login());
      navigate(`/cheer/${codedEmail}`, { replace: true });
    }
  }, [accessToken, refreshToken, codedEmail, navigate, dispatch]);
  return <div />;
}
export default CallBackPage;
