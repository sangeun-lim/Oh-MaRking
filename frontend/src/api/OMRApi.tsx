import axios from 'axios';
import Url from 'api/Url';
import {
  NewOmr,
  ChangeColor,
  CheckPw,
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

    getUserOmr: async (omr_id: number) => {
      const response = await axios({
        url: Url.omr.ReadOmr(omr_id),
        headers: {},
        method: 'get',
      });
      return response;
    },

    getNotUserOmr: async (omr_id: number) => {
      const response = await axios({
        url: Url.omr.ReadOmr(omr_id),
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

    readNote: async (note_id: number) => {
      const response = await axios({
        url: Url.note.readNote(note_id),
        headers: {},
        method: 'get',
      });
      return response;
    },

    updateNote: async (note_id: string, formData: UpdateNoteData) => {
      const response = await axios({
        url: Url.note.createOrUpdateOrDeleteNote(),
        method: 'put',
        data: {
          ...formData,
          note_id: note_id,
        },
      });
      return response;
    },

    deleteNOte: async (note_id: string) => {
      const response = await axios({
        url: Url.note.createOrUpdateOrDeleteNote(),
        method: 'delete',
        data: note_id,
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
  },

  password: {
    checkPw: async (formData: CheckPw) => {
      const response = await axios({
        url: Url.password.checkPW(),
        method: 'post',
        data: formData,
      });
      return response;
    },
  },
};

export default OMRApi;
