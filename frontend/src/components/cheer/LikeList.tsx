import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setShow, setDetail, setCheer } from '../../store/modal';
import { RootState } from '../../store/store';
import styles from './LikeList.module.scss';

interface Props {
  username: string;
  content: string;
  nickname: string;
}

// interface textLengthProps {
//   txt: string;
//   len: number;
//   lastTxt: string;
// }

// function textLength({ txt, len, lastTxt }: textLengthProps): JSX.Element {
//   if (txt.length > len) {
//     txt = txt.substr(0, len) + lastTxt;
//   }
//   return txt;
// }

function LikeList({ username, content, nickname }: Props): JSX.Element {
  const dispatch = useDispatch();

  const DetailOpen = () => {
    dispatch(setShow());
    dispatch(setDetail());
  };

  return (
    <div onClick={DetailOpen} role="presentation">
      <div className={styles.letter}>
        <div className={styles.to_name}>To.{username}</div>
        {/* 일정 편지내용 이상이면 ...으로 되게끔 */}
        <div className={styles.letter_content}>{content}</div>
        <div>From.{nickname}</div>
      </div>
    </div>
  );
}

export default LikeList;
