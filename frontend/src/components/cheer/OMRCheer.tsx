import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getKey } from '../../utils/utils';
import CreateMsg from './CreateMsg';
import CheckPw from './CheckPw';
import DetailMsg from './DetailMsg';
import CantReadMsg from './CantReadMsg';
import type { RootState } from '../../store/store';
import styles from './OMR.module.scss';

interface CheerProps {
  msg: number[][];
  start: number;
}

function Cheer({ msg, start }: CheerProps): JSX.Element {
  const { omr } = useSelector((state: RootState) => state);

  const [show, setShow] = useState<boolean>(false);
  const [pass, setPass] = useState<boolean>(false);
  const [problemNumber, setProblemNumber] = useState<number>(0);
  const [elementNumber, setElementNumber] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [noteStatusInfo, setNoteStatusInfo] = useState<number>(0);
  const [noteInfoTrue, setNoteInfoTrue] = useState<boolean>(false);

  const openModal = (problemNum: number, elementNum: number) => {
    setProblemNumber(problemNum);
    setElementNumber(elementNum);
    setNoteStatusInfo(omr.omrInfo[problemNum][elementNum]);
    if (noteInfoTrue) {
      setPass(true);
    }
    setShow(true);
  };

  const handleMouseOver = (problemNum: number, elementNum: number) => {
    setIsHovering(true);
    setProblemNumber(problemNum);
    setElementNumber(elementNum);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
    setProblemNumber(0);
    setElementNumber(0);
  };
  // noteId가 필요
  const noteId = omr.noteInfo[problemNumber][elementNumber];

  // note의 상태가 필요
  useEffect(() => {
    if (noteStatusInfo === 3) {
      setNoteInfoTrue(false);
    } else {
      setNoteInfoTrue(true);
    }
  }, [noteStatusInfo]);

  // [작성가능 / 이미 읽은 거 / 아직 안읽은 거 / 못 읽는 거 / 즐겨찾기]
  const omrBg = ['empty', 'already', 'notyet', 'cannot', 'liked'];

  interface coordsProps {
    x: number;
    y: number;
  }

  const [coords, setCoords] = useState<coordsProps>({ x: 0, y: 0 });
  const [globalCoords, setGlobalCoords] = useState<coordsProps>({ x: 0, y: 0 });
  useEffect(() => {
    // 👇️ get global mouse coordinates
    const handleWindowMouseMove = (event: any) => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
      // console.log(coords);
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, [coords]);

  const handleMouseMove = (event: any) => {
    setCoords({
      x: event.clientX - event.target.offsetLeft,
      y: event.clientY - event.target.offsetTop,
    });
  };

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
        {/* {show ? (
          <div>
            {!noteId ? (
              <CreateMsg
                problemNum={problemNumber}
                elementNum={elementNumber}
                show={show}
                setShow={setShow}
              />
            ) : (
              <div>
                {omr.isOwner ? (
                  <div>
                    {noteInfoTrue ? (
                      <DetailMsg
                        pass={pass}
                        setShow={setShow}
                        setPass={setPass}
                        noteId={noteId}
                      />
                    ) : (
                      <CantReadMsg
                        pass={pass}
                        setPass={setPass}
                        setShow={setShow}
                      />
                    )}
                  </div>
                ) : (
                  <CheckPw show={show} setShow={setShow} noteId={noteId} />
                )}
              </div>
            )}
          </div>
        ) : null} */}
        {show ? (
          <div>
            {!noteId ? (
              <CreateMsg
                problemNum={problemNumber}
                elementNum={elementNumber}
                show={show}
                setShow={setShow}
              />
            ) : (
              <div>
                {noteInfoTrue ? (
                  <DetailMsg
                    pass={pass}
                    setShow={setShow}
                    setPass={setPass}
                    noteId={noteId}
                  />
                ) : (
                  <CantReadMsg
                    pass={pass}
                    setPass={setPass}
                    setShow={setShow}
                  />
                )}
              </div>
            )}
          </div>
        ) : null}
        {isHovering && (
          <div>
            {' '}
            {omr.nicknameInfo[problemNumber][elementNumber]}{' '}
            {omr.showDateInfo[problemNumber][elementNumber]}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cheer;
