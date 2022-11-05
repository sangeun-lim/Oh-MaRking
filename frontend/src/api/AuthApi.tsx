import axios from 'axios';
import Url from './Url';
import { UserData } from './ApiInterface';

const AuthApi = {
  auth: {
    // 로그인 로그아웃 을 만들어야되나?

    updateUserProfile: async (formData: UserData) => {
      const response = await axios({
        url: Url.auth.updateIntroduction(),
        headers: {},
        method: 'put',
        data: { ...formData },
      });
      return response;
    },
  },
};

export default AuthApi;
