const HOST = 'https://oh-marking.com';

const USER = '/user';
const OMR = '/omr';
const EVENT = '/event';
const NOTE = '/note';
const CHECK = '/check';
const LOGIC = '/logic';

const Url = {
  auth: {
    getCodedEmail: () => `${HOST + USER}/email`,
    logout: () => `${HOST}/logout`,
    updateIntroduction: () => `${HOST + USER}`,
  },

  omr: {
    LinkAccess: (codedEmail: string) => `${HOST + USER}/info/${codedEmail}`,
    ReadUserOmr: (omrId: number) => `${HOST + LOGIC + OMR + USER}/${omrId}`,
    ReadGuestOmr: (omrId: number) => `${HOST + LOGIC + OMR}/guest/${omrId}`,
    newOMR: () => `${HOST + LOGIC + OMR}`,
    changeColor: () => `${HOST + LOGIC + OMR}/color`,
    createOrUpdateOrDeleteNote: (noteId: number) =>
      `${HOST + LOGIC + OMR}/${noteId}`,
  },

  note: {
    createOrUpdateNote: () => `${HOST + LOGIC + NOTE}`,
    DeleteNote: (noteId: number) => `${HOST + LOGIC + NOTE}/${noteId}`,
    readUserNote: (noteId: number) => `${HOST + LOGIC + NOTE}/${noteId}`,
    readGuestNote: (noteId: number) => `${HOST + LOGIC + NOTE}/guest/${noteId}`,
    searchNote: (nickname: string) =>
      `${HOST + LOGIC + NOTE}/search/${nickname}`,
    likeNote: () => `${HOST + LOGIC + NOTE}/favorite`,
    likeList: (codedEmail: string) =>
      `${HOST + LOGIC + NOTE}/favorites/${codedEmail}`,
    // likeList: (omrId: number) => `${HOST + LOGIC + NOTE}/favorites/${omrId}`,
  },
  password: {
    checkPW: () => `${HOST + LOGIC + NOTE + CHECK}`,
  },
  event: {
    readEvent: () => HOST + LOGIC + EVENT,
  },
};

export default Url;
