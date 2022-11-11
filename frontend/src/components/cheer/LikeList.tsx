import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import OMRApi from '../../api/OMRApi';
import DetailMsg from './DetailMsg';
import { setOmr, setIsLoading } from '../../store/omr';
import { setShow, setDetail, setCheer } from '../../store/modal';
import { RootState } from '../../store/store';

interface Props {
  likeIdx: number;
  username: string;
  content: string;
  nickname: string;
}

function LikeList({
  likeIdx,
  username,
  content,
  nickname,
}: Props): JSX.Element {
  const dispatch = useDispatch();
  const { modal, user, omr, auth, likeList } = useSelector(
    (state: RootState) => state
  );

  const DetailOpen = async () => {
    const { pageNum, problemNum, checkNum } = likeList.likeList[likeIdx];
    console.log('omrId', user.omrList[pageNum]);
    const { data, status } = await OMRApi.omr.getOmr(
      user.omrList[pageNum],
      auth.isLoggedIn
    );
    console.log('likeList data', data);
    dispatch(setOmr(data));
    dispatch(setIsLoading(true));
    dispatch(setCheer({ problemIdx: problemNum, elementIdx: checkNum }));
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
