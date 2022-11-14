import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShow, setDetail, setCheer } from '../../store/modal';
import { setNoteOpen } from '../../store/omr';
import { setNote } from '../../store/note';
import OMRApi from '../../api/OMRApi';
import { RootState } from '../../store/store';
import styles from './LikeList.module.scss';

interface Props {
  username: string;
  content: string;
  nickname: string;
  pageNum: number;
  problemNum: number;
  checkNum: number;
}

function LikeList({
  username,
  content,
  nickname,
  pageNum,
  problemNum,
  checkNum,
}: Props): JSX.Element {
  const dispatch = useDispatch();

  const DetailOpen = async () => {
    dispatch(setCheer({ problemIdx: problemNum, elementIdx: checkNum }));
    dispatch(setShow());
    dispatch(setDetail());
  };

  return (
    <div onClick={DetailOpen} role="presentation">
      <div className={styles.letter}>
        <div className={styles.to_name}>
          To.{username} ({pageNum + 1}교시-{problemNum + 1}번 문항-
          {checkNum + 1})
        </div>
        <div className={styles.letter_content}>{content}</div>
        <div>From.{nickname}</div>
      </div>
    </div>
  );
}

export default LikeList;
