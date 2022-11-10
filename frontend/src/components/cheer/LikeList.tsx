import { useState } from 'react';
import { useSelector } from 'react-redux';
import DetailMsg from './DetailMsg';
import { RootState } from '../../store/store';

interface Props {
  noteId: number;
  username: string;
  content: string;
  nickname: string;
}

function LikeList({ noteId, username, content, nickname }: Props): JSX.Element {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const { modal } = useSelector((state: RootState) => state);
  const DetailOpen = () => {
    setOpenDetail(true);
  };

  return (
    <div>
      {openDetail ? (
        <DetailMsg pass={modal.pass} noteId={noteId} />
      ) : (
        <div onClick={DetailOpen} role="presentation">
          <div>To.{username}</div>
          {/* 일정 편지내용 이상이면 ...으로 되게끔 */}
          <div>{content}</div>
          <div>From.{nickname}</div>
        </div>
      )}
    </div>
  );
}

export default LikeList;
