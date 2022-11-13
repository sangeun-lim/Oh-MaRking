import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShow, setDetail, setCheer } from '../../store/modal';
import { RootState } from '../../store/store';

interface Props {
  username: string;
  content: string;
  nickname: string;
}

function LikeList({ username, content, nickname }: Props): JSX.Element {
  const dispatch = useDispatch();

  const DetailOpen = () => {
    dispatch(setShow());
    dispatch(setDetail());
  };

  return (
    <div onClick={DetailOpen} role="presentation">
      <div>To.{username}</div>
      {/* 일정 편지내용 이상이면 ...으로 되게끔 */}
      <div>{content}</div>
      <div>From.{nickname}</div>
    </div>
  );
}

export default LikeList;
