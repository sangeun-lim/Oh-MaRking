import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getKey } from '../../utils/utils';
import {
  setShow,
  setCheer,
  setCreate,
  setDetail,
  setUpdate,
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
    CANNOTREAD: 3,
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
      case s.CANNOTREAD:
        console.log('status', status, problemNum, elementNum);
        // console.log('status', omr.info);
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

  interface coordsProps {
    x: number;
    y: number;
  }
  // const [coords, setCoords] = useState<coordsProps>({ x: 0, y: 0 });
  // const [globalCoords, setGlobalCoords] = useState<coordsProps>({ x: 0, y: 0 });
  // useEffect(() => {
  //   // 👇️ get global mouse coordinates
  //   const handleWindowMouseMove = (event: any) => {
  //     setGlobalCoords({
  //       x: event.screenX,
  //       y: event.screenY,
  //     });
  //     // console.log(coords);
  //   };
  //   window.addEventListener('mousemove', handleWindowMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleWindowMouseMove);
  //   };
  // }, [coords]);

  // const handleMouseMove = (event: any) => {
  //   setCoords({
  //     x: event.clientX - event.target.offsetLeft,
  //     y: event.clientY - event.target.offsetTop,
  //   });
  // };

  return (
    <div className={`${styles.section} ${styles.body}`}>
      <div className={`${styles.header} ${styles.top}`}>
        <span />
        {/* <span>gk</span> */}
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
            <div>
              {problem.map((element, elementIdx) => (
                <button
                  className={`${styles[omrBg[element]]}`}
                  key={getKey()}
                  type="button"
                  onMouseEnter={() =>
                    handleMouseOver(problemIdx + start, elementIdx)
                  }
                  onMouseLeave={() => handleMouseOut()}
                  onClick={() => openModal(problemIdx + start, elementIdx)}
                >
                  {element === 4 ? null : elementIdx + 1}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        {isHovering && (
          <div>
            {' '}
            {omr.nicknameInfo[modal.problemIdx][modal.elementIdx]}{' '}
            {omr.showDateInfo[modal.problemIdx][modal.elementIdx]}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cheer;
