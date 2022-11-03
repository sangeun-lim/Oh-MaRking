import axios from 'axios';
import Url from 'api/Url';
import {
  NewOmr,
  ChangeColor,
  // CheckPw,
  NewNoteData,
  UpdateNoteData,
} from 'api/ApiInterface';

const OMRApi = {
  omr: {
    linkAccess: async (email: string) => {
      const response = await axios({
        url: Url.omr.LinkAccess(email),
        method: 'get',
      });
      return response;
    },

    getUserOmr: async (omrId: number) => {
      const response = await axios({
        url: Url.omr.ReadOmr(omrId),
        headers: {},
        method: 'get',
      });
      return response;
    },

    getNotUserOmr: async (omrId: number) => {
      const response = await axios({
        url: Url.omr.ReadOmr(omrId),
        method: 'get',
      });
      return response;
    },

    createNewOMR: async (formData: NewOmr) => {
      const response = await axios({
        url: Url.omr.newOMRorChangeColor(),
        method: 'post',
        data: formData,
      });
      return response;
    },

    changeOmrColor: async (formData: ChangeColor) => {
      const response = await axios({
        url: Url.omr.newOMRorChangeColor(),
        headers: {},
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
        headers: {},
        method: 'get',
      });
      return response;
    },

    updateNote: async (noteId: string, formData: UpdateNoteData) => {
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

    deleteNote: async (noteId: string) => {
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

    likeNote: async (noteId: string, favorite: number) => {
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
