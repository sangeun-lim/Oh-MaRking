import { forwardRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
import { getKey } from '../../utils/utils';
import {
  setShow,
  setCheer,
  setCreate,
  setDetail,
  setCannotRead,
} from '../../store/modal';

import type { RootState } from '../../store/store';
import styles from './OMR.module.scss';

interface CheerProps {
  msg: number[][];
  start: number;
}

function Cheer({ msg, start }: CheerProps): JSX.Element {
  const s = {
    CREATE: 0,
    canNotRead: 3,
  };
  const dispatch = useDispatch();
  const { omr, modal } = useSelector((state: RootState) => state);

  const [isHovering, setIsHovering] = useState<boolean>(false);

  const openModal = (problemNum: number, elementNum: number) => {
    dispatch(setShow());
    dispatch(setCheer({ problemIdx: problemNum, elementIdx: elementNum }));
    const status = omr.omrInfo[problemNum][elementNum];
    switch (status) {
      case s.CREATE:
        dispatch(setCreate());
        break;
      case s.canNotRead:
        dispatch(setCannotRead());
        break;
      default:
        dispatch(setDetail());
    }
  };

  const handleMouseOver = (problemNum: number, elementNum: number) => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };
  // [작성가능 / 이미 읽은 거 / 아직 안읽은 거 / 못 읽는 거 / 즐겨찾기]
  const omrBg = ['empty', 'already', 'notyet', 'cannot', 'liked'];

  const getContent = (problemIdx: number, elementIdx: number) => {
    const nickName = omr.nicknameInfo[problemIdx][elementIdx];
    const showDate = omr.showDateInfo[problemIdx][elementIdx];
    if (showDate === null) {
      return 'plz..💬';
    }
    return `${nickName} ${showDate}`;
  };
  return (
    <div className={`${styles.section} ${styles.body}`}>
      <div className={`${styles.header} ${styles.top}`}>
        <span />
        <span>응</span>
        <span>원</span>
        <span>한</span>
        <span>마</span>
        <span>디</span>
      </div>
      <div className={styles.button}>
        {msg.map((problem, problemIdx) => (
          <div className={styles.problem} key={getKey()}>
            <span>{problemIdx + start + 1}</span>
            {/* <div> */}
            {problem.map((element, elementIdx) => (
              <Tooltip
                title={getContent(problemIdx + start, elementIdx)}
                key={getKey()}
                arrow
                placement="top"
                classes={{ popper: `${styles.MuiTooltip_popper}` }}
              >
                <button
                  className={`${styles[omrBg[element]]}`}
                  type="button"
                  onMouseEnter={() =>
                    handleMouseOver(problemIdx + start, elementIdx)
                  }
                  onMouseLeave={() => handleMouseOut()}
                  onClick={() => openModal(problemIdx + start, elementIdx)}
                >
                  {element === 4 ? null : elementIdx + 1}
                </button>
              </Tooltip>
            ))}
            {/* </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cheer;
