import axios from 'axios';
import Url from './Url';
import {
  NewOmr,
  ChangeColor,
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

    getOmr: async (omrId: number, isLoggedIn: boolean) => {
      const response = isLoggedIn
        ? await OMRApi.omr.getUserOmr(omrId)
        : await OMRApi.omr.getNotUserOmr(omrId);
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
        url: Url.note.createOrUpdateNote(),
        // 삭제예정
        headers: {
          Authorization: `Bearer ${getSessionStorage('accessToken')}`,
        },
        method: 'post',
        data: formData,
      });
      return response;
    },

    getNote: async (noteId: number, isOwner: boolean) => {
      const response = isOwner
        ? await OMRApi.note.readUserNote(noteId)
        : await OMRApi.note.readNotUserNote(noteId);
      return response;
    },

    readUserNote: async (noteId: number) => {
      const response = await axios({
        url: Url.note.readUserNote(noteId),
        headers: {
          Authorization: `Bearer ${getSessionStorage('accessToken')}`,
        },
        method: 'get',
      });
      return response;
    },

    readNotUserNote: async (noteId: number) => {
      const response = await axios({
        url: Url.note.readGuestNote(noteId),
        method: 'get',
      });
      return response;
    },

    updateNote: async (noteId: number, formData: UpdateNoteData) => {
      const response = await axios({
        url: Url.note.createOrUpdateNote(),
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
        url: Url.note.DeleteNote(noteId),
        method: 'delete',
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

    likeNote: async (noteId: number, isFavorite: boolean) => {
      const response = await axios({
        url: Url.note.likeNote(),
        method: 'put',
        headers: {
          Authorization: `Bearer ${getSessionStorage('accessToken')}`,
        },
        data: {
          noteId,
          isFavorite,
        },
      });
      return response;
    },
    likeList: async (codedEmail: string) => {
      const response = await axios({
        url: Url.note.likeList(codedEmail),
        method: 'get',
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
