import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addOmr, setUser } from '../../store/user';
import { stampUrl } from '../../utils/imgUrl';
import { setColor, setNoteStatus, setIsOwner, setOmr } from '../../store/omr';
import Search from './Search';
import { getKey } from '../../utils/utils';
import CreateMsg from './CreateMsg';
import CheckPw from './CheckPw';
import DetailMsg from './DetailMsg';
import OMRApi from '../../api/OMRApi';
import type { RootState } from '../../store/store';
import styles from './OMR.module.scss';
import LinkCopy from './LinkCopy';
import updateImgUrl from '../../img/수정 아이콘.png';

interface CheerProps {
  msg: number[][];
  start: number;
}

interface InfoProps {
  title: string;
  content: string;
}

interface PalletProps {
  colorList: string[];
}

function Cheer({ msg, start }: CheerProps): JSX.Element {
  const { omr, note } = useSelector((state: RootState) => state);

  const [show, setShow] = useState<boolean>(false);
  const [pass, setPass] = useState<boolean>(false);
  const [problemNumber, setProblemNumber] = useState<number>(0);
  const [elementNumber, setElementNumber] = useState<number>(0);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [noteInfoTrue, setNoteInfoTrue] = useState<boolean>(false);

  const openModal = (problemNum: number, elementNum: number) => {
    setProblemNumber(problemNum);
    setElementNumber(elementNum);
    if (noteInfoTrue && omr.isOwner) {
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
  const noteInfo = omr.omrInfo[problemNumber][elementNumber];

  useEffect(() => {
    if (noteInfo === 1 || 2) {
      setNoteInfoTrue(true);
    } else {
      setNoteInfoTrue(false);
    }
  }, [noteInfo]);

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
    const handleWindowMouseMove = (event) => {
      setGlobalCoords({
        x: event.screenX,
        y: event.screenY,
      });
      console.log(coords);
    };
    window.addEventListener('mousemove', handleWindowMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
    };
  }, [coords]);

  const handleMouseMove = (event) => {
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
                  onClick={
                    // () => test(problemIdx + start, elementIdx)
                    () => openModal(problemIdx + start, elementIdx)
                  }
                >
                  {element === 4 ? null : elementIdx + 1}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
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
                {omr.isOwner ? (
                  <div>
                    {noteInfoTrue ? (
                      <DetailMsg
                        pass={pass}
                        setPass={setPass}
                        noteId={noteId}
                      />
                    ) : (
                      <div>못읽습니다.</div>
                    )}
                  </div>
                ) : (
                  <CheckPw show={show} setShow={setShow} noteId={noteId} />
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

function Info({ title, content }: InfoProps): JSX.Element {
  const { isOwner } = useSelector((state: RootState) => state.omr);
  const [isEdting, setIsEdting] = useState(false);
  // const switchIsEditing = useCallback(() => {
  //   console.log('전', isEdting);
  //   setIsEdting((state) => !state);
  //   console.log('후', isEdting);
  // }, [isEdting]);
  return (
    <div className={styles.section}>
      <div className={`${styles.header} ${styles.left}`}>
        <div>{title}</div>
      </div>
      <div className={` ${styles.body} ${styles.right}`}>
        {content !== '감독확인란' ? (
          <>
            <div>{content}</div>
            <img
              role="presentation"
              className={styles.edit}
              src={updateImgUrl}
              alt="수정버튼"
              style={{
                display: isOwner ? 'visible' : 'none',
              }}
            />
          </>
        ) : (
          <img src={stampUrl} alt="감독은 노녕과 아이들" />
        )}
      </div>
    </div>
  );
}

function Code(): JSX.Element {
  return (
    <div className={styles.code}>
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

function Pallet({ colorList }: PalletProps): JSX.Element {
  const { omrList } = useSelector((state: RootState) => state.user);
  const { isOwner, pageNum, color } = useSelector(
    (state: RootState) => state.omr
  );
  const dispatch = useDispatch();

  const changeColor = useCallback(async (newColor: number, omrId: number) => {
    const ChangeColor = {
      color: newColor,
      omrId,
    };
    const { status } = await OMRApi.omr.changeOmrColor(ChangeColor);
    if (status === 202) {
      alert('색상이 변경되었습니다.');
    }
  }, []);

  const onClick = (newColor: number) => {
    // 색상이 이전 값과 같을 때 처리하기
    if (isOwner && color !== newColor) {
      changeColor(newColor, omrList[pageNum]);
    }
    dispatch(setColor(newColor));
  };

  const colors = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      {colors.map((newColor: number) => (
        <span key={newColor} className={`${styles[colorList[newColor]]}`}>
          <button
            className={styles.body}
            type="button"
            onClick={() => onClick(newColor)}
          >
            {' '}
          </button>
        </span>
      ))}
    </>
  );
}

function OMR(): JSX.Element {
  const { user, omr, auth } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const colorList = [
    'yellow',
    'skyblue',
    'purple',
    'green',
    'dark_yellow',
    'navy',
    'orange',
    'pink',
  ];

  const movePage = useCallback(
    async (move: number) => {
      const leftOrRight = omr.pageNum + move;
      const { status, data } = auth.isLoggedIn
        ? await OMRApi.omr.getUserOmr(user.omrList[leftOrRight])
        : await OMRApi.omr.getNotUserOmr(user.omrList[leftOrRight]);
      if (status === 200) {
        dispatch(setUser(data.data.user));
        dispatch(setOmr(data.data.omr));
        dispatch(setIsOwner(data.data.isOwner));
      }
    },
    [auth.isLoggedIn, dispatch, omr.pageNum, user.omrList]
  );

  const createNewPage = useCallback(async () => {
    const newPage = user.omrList.length + 1;
    const NewOmr = {
      color: (newPage % 8) - 1,
      pageNum: newPage,
      userId: user.userId,
    };
    const { status, data } = await OMRApi.omr.createNewOMR(NewOmr);
    if (status === 201) {
      alert('새로운 페이지가 추가되었습니다.');
      dispatch(addOmr(data.data.omrId));
    }
  }, [user.userId, user.omrList, dispatch]);

  return (
    <div className={`${styles[colorList[omr.color]]}`}>
      <div className={`${styles.omr} ${styles.body}`}>
        {/* OMR TOP */}
        <Code />
        <div className={styles.omr_head}>
          <button
            className={styles.header}
            type="button"
            onClick={() => createNewPage()}
          >
            답안지 교체
          </button>
          <div className={styles.header}>
            <Search />
          </div>
        </div>
        {/* OMR BODY */}
        <div className={styles.omr_body}>
          {/* 좌측: 정보확인란 */}
          <button
            type="button"
            onClick={() => movePage(-1)}
            style={{ visibility: omr.pageNum === 1 ? 'hidden' : 'visible' }}
          >
            &#10094;
          </button>
          <div className={styles.info}>
            <div className={`${styles.page}`}>
              <span className={`${styles.body}`}>{omr.pageNum + 1}</span>
              <span>교시 응원영역</span>
              <LinkCopy />
            </div>

            <Info title={'이  름'} content={`${user.name}`} />
            <Info title={'필  적\n확인란'} content={user.introduction} />
            <div>
              <div className={`${styles.header} ${styles.top}`}>주의사항</div>
              <div className={`${styles.body} ${styles.bottom}`}>
                <p>
                  &#8251; 응원하고 싶은 칸을 골라서 응원메세지를 작성해주세요
                </p>
                <p>
                  &#8251; 마지막 페이지에서 마킹이 5개 이상일 때, 새로운
                  페이지를 생성할 수 있습니다.
                </p>
                <p>&#8251; 표시안내</p>
                {/* <span className={}/> */}
                {/* <span className={}/> */}
                {/* <span className={}/> */}
                {/* <span className={}/> */}
                <div className={styles.pallet}>
                  <Pallet colorList={colorList} />
                </div>
              </div>
            </div>
            <Info title={'감  독\n확인란'} content={'감독확인란'} />
          </div>
          {/* 그 외: 응원구역 */}
          <div className={`${styles.cheer}`}>
            <Cheer msg={omr.omrInfo.slice(0, 10)} start={0} />
          </div>
          <div className={`${styles.cheer}`}>
            <Cheer msg={omr.omrInfo.slice(10, 20)} start={10} />
          </div>
          <button
            type="button"
            onClick={() => movePage(1)}
            style={{
              visibility:
                omr.pageNum === user.omrList.length ? 'hidden' : 'visible',
            }}
          >
            &#10095;
          </button>
        </div>
        <div className={styles.omr_footer} />
        <Code />
      </div>
    </div>
  );
}

export default OMR;
