import axios from 'axios';
import Url from './Url';
import {
  NewOmr,
  ChangeColor,
  // CheckPw,
  NewNoteData,
  UpdateNoteData,
} from './ApiInterface';
import { getSessionStorage } from '../utils/utils';

const OMRApi = {
  omr: {
    linkAccess: async (codedEmail: string) => {
      const response = await axios({
        url: Url.omr.LinkAccess(codedEmail),
        method: 'get',
      });
      return response;
    },

    getUserOmr: async (omrId: number) => {
      const response = await axios({
        url: Url.omr.ReadUserOmr(omrId),
        headers: {
          Authorization: `Bearer ${getSessionStorage('accessToken')}`,
        },
        method: 'get',
      });
      return response;
    },

    getNotUserOmr: async (omrId: number) => {
      const response = await axios({
        url: Url.omr.ReadGuestOmr(omrId),
        method: 'get',
      });
      return response;
    },

    createNewOMR: async (formData: NewOmr) => {
      const response = await axios({
        url: Url.omr.newOMR(),
        method: 'post',
        data: formData,
      });
      return response;
    },

    changeOmrColor: async (formData: ChangeColor) => {
      const response = await axios({
        url: Url.omr.changeColor(),
        headers: {
          Authorization: `Bearer ${getSessionStorage('accessToken')}`,
        },
        method: 'put',
        data: formData,
      });
      return response;
    },
  },

  note: {
    createNote: async (formData: NewNoteData) => {
      const response = await axios({
        url: Url.note.createOrUpdateOrDeleteNote(),
        method: 'post',
        data: formData,
      });
      return response;
    },

    readNote: async (noteId: number) => {
      const response = await axios({
        url: Url.note.readNote(noteId),
        headers: {
          Authorization: `Bearer ${getSessionStorage('accessToken')}`,
        },
        method: 'get',
      });
      return response;
    },

    updateNote: async (noteId: number, formData: UpdateNoteData) => {
      const response = await axios({
        url: Url.note.createOrUpdateOrDeleteNote(),
        method: 'put',
        data: {
          noteId,
          ...formData,
        },
      });
      return response;
    },

    deleteNote: async (noteId: number) => {
      const response = await axios({
        url: Url.note.createOrUpdateOrDeleteNote(),
        method: 'delete',
        data: noteId,
      });
      return response;
    },

    searchNote: async (nickname: string) => {
      const response = await axios({
        url: Url.note.searchNote(nickname),
        method: 'get',
      });
      return response;
    },

    likeNote: async (noteId: number, favorite: number) => {
      const response = await axios({
        url: Url.note.likeNote(),
        method: 'put',
        data: {
          noteId,
          favorite,
        },
      });
      return response;
    },
  },

  password: {
    checkPw: async (noteId: number, pwd: string) => {
      const response = await axios({
        url: Url.password.checkPW(),
        method: 'post',
        data: {
          noteId,
          pwd,
        },
      });
      return response;
    },
  },
};

export default OMRApi;
