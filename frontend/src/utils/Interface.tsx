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
