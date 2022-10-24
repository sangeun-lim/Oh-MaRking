import axios from 'axios';
import Url from './Url';
import { LoginData } from './ApiInterface';

const AuthApi = {
  auth: {
    login: async (formData: LoginData) => {
      const response = await axios({
        url: Url.auth.login(),
        method: 'post',
        data: {
          email: formData.id,
          password: formData.pw,
        },
      });
      return response;
    },
  },
};

export default AuthApi;
