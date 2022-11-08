export interface UserData {
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
  content: string;
  showDate: string;
}
