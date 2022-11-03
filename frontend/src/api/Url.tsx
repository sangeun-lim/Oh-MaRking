const HOST = 'https://k7c102.p.ssafy.io/';

// const AUTH = 'auth/';
const USER = 'user/';
const OMR = 'omr/';
const EVENT = 'event/';
const NOTE = 'note/';
const CHECK = 'check/';

const Url = {
  auth: {
    //   login: () => `${HOST + AUTH}login`,
    //   logout: () => `${HOST + AUTH}logout`,
    updateIntroduction: () => `${HOST}introduction`,
  },

  omr: {
    LinkAccess: (email: string) => `${HOST + USER}${email}`,
    ReadOmr: (omrId: number) => `${HOST + OMR}${omrId}`,
    newOMRorChangeColor: () => `${HOST + OMR}`,
    createOrUpdateOrDeleteNote: (noteId: number) => `${HOST + OMR}${noteId}`,
  },

  note: {
    createOrUpdateOrDeleteNote: () => `${HOST + NOTE}`,
    readNote: (noteId: number) => `${HOST + NOTE}${noteId}`,
    searchNote: (nickname: string) => `${HOST + NOTE}search/${nickname}`,
  },
  password: {
    checkPW: () => `${HOST + CHECK}`,
  },
  event: {
    readEvent: () => HOST + EVENT,
  },
};

export default Url;
