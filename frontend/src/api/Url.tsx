// const HOST = 'http://oh-marking.com:8081/api/';
// const HOST2 = 'http://oh-marking.com:8081/logout';
const HOST = 'https://oh-marking.com';

// const USER = 'user/';
// const OMR = 'omr/';
// const OMR2 = 'omr';
// const EVENT = 'event/';
// const NOTE = 'note/';
// const NOTE2 = 'note';
// const CHECK = 'check';
const USER = '/user';
const OMR = '/omr';
const EVENT = '/event';
const NOTE = '/note';
const CHECK = '/check';
const LOGIC = '/logic';

const Url = {
  auth: {
    // getCodedEmail: () => `${HOST + USER}email`,
    // logout: () => `${HOST2}`,
    // updateIntroduction: () => `${HOST}user`,
    getCodedEmail: () => `${HOST + USER}/email`,
    logout: () => `${HOST}/logout`,
    updateIntroduction: () => `${HOST + USER}`,
  },

  omr: {
    // LinkAccess: (codedEmail: string) => `${HOST + USER}info/${codedEmail}`,
    // ReadUserOmr: (omrId: number) => `${HOST + OMR + USER}${omrId}`,
    // ReadGuestOmr: (omrId: number) => `${HOST + OMR}guest/${omrId}`,
    // newOMR: () => `${HOST + OMR2}`,
    // changeColor: () => `${HOST + OMR}color`,
    LinkAccess: (codedEmail: string) => `${HOST + USER}/info/${codedEmail}`,
    ReadUserOmr: (omrId: number) => `${HOST + LOGIC + OMR + USER}/${omrId}`,
    ReadGuestOmr: (omrId: number) => `${HOST + LOGIC + OMR}/guest/${omrId}`,
    newOMR: () => `${HOST + LOGIC + OMR}`,
    changeColor: () => `${HOST + LOGIC + OMR}/color`,

    createOrUpdateOrDeleteNote: (noteId: number) => `${HOST + OMR}${noteId}`,
  },

  note: {
<<<<<<< HEAD
    // createOrUpdateNote: () => `${HOST + NOTE2}`,
    // DeleteNote: (noteId: number) => `${HOST + NOTE}del/${noteId}`,
    // readNote: (noteId: number) => `${HOST + NOTE}${noteId}`,
    // searchNote: (nickname: string) => `${HOST + NOTE}search/${nickname}`,
    // likeNote: () => `${HOST + NOTE}favorite`,
    // likeList: () => `${HOST + NOTE}favorites`,
    createOrUpdateNote: () => `${HOST + LOGIC + NOTE}`,
    DeleteNote: (noteId: number) => `${HOST + LOGIC + NOTE}/${noteId}`,
    readUserNote: (noteId: number) => `${HOST + LOGIC + NOTE}/${noteId}`,
    readGuestNote: (noteId: number) => `${HOST + LOGIC + NOTE}/guest/${noteId}`,
    searchNote: (nickname: string) => `${HOST + NOTE}/search/${nickname}`,
    likeNote: () => `${HOST + NOTE}/favorite`,
    likeList: () => `${HOST + NOTE}/favorites`,
=======
    createOrUpdateNote: () => `${HOST + NOTE2}`,
    DeleteNote: (noteId: number) => `${HOST + NOTE}del/${noteId}`,
    readUserNote: (noteId: number) => `${HOST + NOTE}${noteId}`,
    readGuestNote: (noteId: number) => `${HOST + NOTE}guest/${noteId}`,
    searchNote: (nickname: string) => `${HOST + NOTE}search/${nickname}`,
    likeNote: () => `${HOST + NOTE}favorite`,
    likeList: (codedEmail: string) => `${HOST + NOTE}favorites/${codedEmail}`,
>>>>>>> e2cb8b553137eadb999aacb831b39ca850b4cc61
  },
  password: {
    checkPW: () => `${HOST + NOTE + CHECK}`,
  },
  event: {
    readEvent: () => HOST + EVENT,
  },
};

export default Url;
