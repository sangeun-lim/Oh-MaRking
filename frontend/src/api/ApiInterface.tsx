// export interface LoginData {
//   id: string;
//   pw: string;
// }

export interface UserData {
  nickname: string;
  introduction: string;
}

export interface NewOmr {
  color: number;
  pageNum: number;
  userId: number;
}

export interface ChangeColor {
  omrId: number;
  color: number;
}

// export interface CheckPw {
//   note_id: number;
//   pwd: string;
// }

export interface NewNoteData {
  omrId: number;
  nickname: string;
  content: string;
  pwd: string;
  showDate: string;
  problemNum: number;
  checkNum: number;
}

export interface UpdateNoteData {
  // note_id: string;
  nickname: string;
  content: string;
  show_date: string;
}
