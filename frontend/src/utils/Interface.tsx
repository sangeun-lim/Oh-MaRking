export interface EventList {
  event_id: string;
  title: string;
  start_date: string;
  end_date: string;
  link: string;
  imgUrl: string;
}

export interface NoteData {
  nickname: string;
  date: string;
  password1: string;
  password2: string;
  content: string;
}

export interface NoteDetail {
  nickname: string;
  content: string;
  showDate: string;
  date: string;
  problemNum: number;
  checkNum: number;
  isFavorite: number;
}

export interface NewNoteData {
  omrId: number;
  nickname: string;
  content: string;
  pwd: string;
  showDate: string;
  problemNum: number;
  checkNum: number;
}

export interface EditNote {
  nickname: string;
  content: string;
  show_date: string;
}

interface User {
  name: string;
  codedEmail: string;
  introduction: string;
}

interface Omr {
  color: number;
  pageNum: number;
  omrInfo: [];
  noteInfo: [];
  isOwner: boolean;
}

export interface OmrData {
  user: User;
  omr: Omr;
}
