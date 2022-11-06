// const HOST = 'https://k7c102.p.ssafy.io/';
const HOST = 'http://oh-marking.com:8081/api/';

// const AUTH = 'auth/';
const USER = 'user/';
const OMR = 'omr/';
const OMR2 = 'omr';
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
    LinkAccess: (codedEmail: string) => `${HOST + USER}info/${codedEmail}`,
    ReadUserOmr: (omrId: number) => `${HOST + OMR + USER}${omrId}`,
    ReadGuestOmr: (omrId: number) => `${HOST + OMR}guest/${omrId}`,
    newOMR: () => `${HOST + OMR2}`,
    changeColor: () => `${HOST + OMR}color`,
    createOrUpdateOrDeleteNote: (noteId: number) => `${HOST + OMR}${noteId}`,
  },

  note: {
    createOrUpdateOrDeleteNote: () => `${HOST + NOTE}`,
    readNote: () => `${HOST + NOTE}see`,
    searchNote: (nickname: string) => `${HOST + NOTE}search/${nickname}`,
    likeNote: () => `${HOST + NOTE}favorite`,
    likeList: () => `${HOST + NOTE}favorites`,
  },
  password: {
    checkPW: () => `${HOST + NOTE + CHECK}`,
  },
  event: {
    readEvent: () => HOST + EVENT,
  },
};

export default Url;