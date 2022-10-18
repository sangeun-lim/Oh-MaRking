const HOST = 'https://abcd/api/';

const AUTH = 'auth/';
const MYPAGE = 'mypage/';

const Url = {
  auth: {
    login: () => `${HOST + AUTH}login`,
  },

  mypage: {
    getLetter: () => HOST + MYPAGE,
    createLetter: (letterId: number) => `${HOST + MYPAGE}${letterId}`,
  },
};

export default Url;
