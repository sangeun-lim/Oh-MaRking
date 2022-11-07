import axios from 'axios';
import Url from './Url';
import { UserData } from './ApiInterface';
import { getSessionStorage } from '../utils/utils';

const AuthApi = {
  auth: {
    // 로그인 로그아웃 을 만들어야되나?
    logout: async () => {
      const response = await axios({
        url: Url.auth.logout(),
        headers: {
          Authorization: `Bearer ${getSessionStorage('accessToken')}`,
        },
        method: 'get',
      });
      return response;
    },

    updateUserProfile: async (formData: UserData) => {
      const response = await axios({
        url: Url.auth.updateIntroduction(),
        headers: {
          Authorization: `Bearer ${getSessionStorage('accessToken')}`,
        },
        method: 'put',
        data: { ...formData },
      });
      return response;
    },
  },
};

export default AuthApi;
