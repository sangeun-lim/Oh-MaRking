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
  user_id: string;
}

export interface ChangeColor {
  omr_id: string;
  color: number;
}

// export interface CheckPw {
//   note_id: number;
//   pwd: string;
// }

export interface NewNoteData {
  omr_id: string;
  nickname: string;
  content: string;
  pwd: string;
  show_data: string;
  problem_num: number;
  check_num: number;
}

export interface UpdateNoteData {
  // note_id: string;
  nickname: string;
  content: string;
  show_date: string;
}
