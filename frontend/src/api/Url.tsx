const HOST = 'http://oh-marking.com:8081/api/';
const HOST2 = 'http://oh-marking.com:8081/logout';

const USER = 'user/';
const OMR = 'omr/';
const OMR2 = 'omr';
const EVENT = 'event/';
const NOTE = 'note/';
const NOTE2 = 'note';
const CHECK = 'check';

const Url = {
  auth: {
    getCodedEmail: () => `${HOST + USER}email`,
    logout: () => `${HOST2}`,
    updateIntroduction: () => `${HOST}user`,
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
    createOrUpdateNote: () => `${HOST + NOTE2}`,
    DeleteNote: (noteId: number) => `${HOST + NOTE}del/${noteId}`,
    readNote: (noteId: number) => `${HOST + NOTE}${noteId}`,
    searchNote: (nickname: string) => `${HOST + NOTE}search/${nickname}`,
    likeNote: () => `${HOST + NOTE}favorite`,
    likeList: (codedEmail: string) => `${HOST + NOTE}favorites/${codedEmail}`,
  },
  password: {
    checkPW: () => `${HOST + NOTE + CHECK}`,
  },
  event: {
    readEvent: () => HOST + EVENT,
  },
};

export default Url;
