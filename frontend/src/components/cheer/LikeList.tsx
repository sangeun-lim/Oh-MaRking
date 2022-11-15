import { useDispatch } from 'react-redux';
import { setShow, setDetail, setCheer } from '../../store/modal';

import styles from './LikeList.module.scss';

interface Props {
  username: string;
  content: string;
  nickname: string;
  problemNum: number;
  checkNum: number;
}

function LikeList({
  username,
  content,
  nickname,
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
        <div className={styles.to_name}>To.{username}</div>
        <div className={styles.txt_post}>{content}</div>
        <div className={styles.from_name}>From.{nickname}</div>
      </div>
    </div>
  );
}

export default LikeList;
