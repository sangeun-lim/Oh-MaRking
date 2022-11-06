import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { updateIntro } from '../../store/user';
import { stampUrl } from '../../utils/imgUrl';
import { setColor, setNoteStatus } from '../../store/omr';
import Search from './Search';
import { getKey } from '../../utils/utils';
import CreateMsg from './CreateMsg';
import CheckPw from './CheckPw';
import DetailOrUpdateMsg from './DetailOrUpdateMsg';
import type { RootState } from '../../store/store';
import styles from './OMR.module.scss';
import LinkCopy from './LinkCopy';

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
  // const dispatch = useDispatch();

  // const test = (problemIdx: number, elementIdx: number) => {
  //   if (omr.omrInfo[problemIdx][elementIdx] === 0) {
  //     dispatch(setNote({ problemIdx, elementIdx, status: 4 }));
  //   } else {
  //     dispatch(setNote({ problemIdx, elementIdx, status: 0 }));
  //   }
  // };
  const [show, setShow] = useState(false);
  const [problemNumber, setProblemNumber] = useState(0);
  const [elementNumber, setElementNumber] = useState(0);

  const openModal = (problemNum: number, elementNum: number) => {
    setShow(true);
    setProblemNumber(problemNum);
    setElementNumber(elementNum);
  };

  // noteId가 필요
  const noteId = omr.noteInfo[problemNumber][elementNumber];

  // note의 상태가 필요
  const noteInfo = omr.omrInfo[problemNumber][elementNumber];

  const [noteInfoTrue, setNoteInfoTrue] = useState<boolean>(false);

  // const isOwner = omr.isOwner;

  useEffect(() => {
    if (noteInfo === 1 || 2) {
      setNoteInfoTrue(true);
    }
  }, [noteInfo]);

  // const noteInfoTrue = noteInfo === 1 || 2

  // [작성가능 / 이미 읽은 거 / 아직 안읽은 거 / 못 읽는 거 / 즐겨찾기]
  const omrBg = ['empty', 'already', 'notyet', 'cannot', 'liked'];

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
      <div>
        {msg.map((problem, problemIdx) => (
          <div className={styles.problem} key={getKey()}>
            <span>{problemIdx + start + 1}</span>
            <div>
              {problem.map((element, elementIdx) => (
                <button
                  className={`${styles[omrBg[element]]}`}
                  key={getKey()}
                  type="button"
                  onClick={
                    // () => test(problemIdx + start, elementIdx)
                    () => openModal(problemIdx + start + 1, elementIdx + 1)
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
        {/* noteId가 없고(빈칸일때) show 가 true일때 */}
        {show && (
          <CreateMsg
            problemNum={problemNumber}
            elementNum={elementNumber}
            show={show}
            setShow={setShow}
          />
        )}
        {/* {!noteId && show && (
          <CreateMsg
            problemNum={problemNumber}
            elementNum={elementNumber}
            show={show}
            setShow={setShow}
          />
        )} */}

        {/* noteId가 있고(빈칸이 아닐때) show가 true일때 */}
        {/* {noteId && show && isOwner ? ( 
          { noteInfoTrue ? (
            // <DetailOrUpdateMsg pass={show} setPass={setShow} formData={} />
          ) : null}
          ) : (
            <CheckPw show={show} setShow={setShow} noteId={noteId} />
          )
        }  */}
      </div>
    </div>
  );
}

function Info({ title, content }: InfoProps): JSX.Element {
  return (
    <div className={styles.section}>
      <div className={`${styles.header} ${styles.left}`}>{title}</div>
      <div className={` ${styles.body} ${styles.right}`}>
        {content !== '감독확인란' ? (
          content
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
  const dispatch = useDispatch();
  const onClick = (color: number) => {
    dispatch(setColor(color));
    // dispatch(updateIntro(`${color}`));
  };

  const colors = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      {colors.map((color: number) => (
        <span key={color} className={`${styles[colorList[color]]}`}>
          <button
            className={styles.body}
            type="button"
            onClick={() => onClick(color)}
          >
            {' '}
          </button>
        </span>
      ))}
    </>
  );
}

function OMR(): JSX.Element {
  const { user, omr } = useSelector((state: RootState) => state);
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

  const pageNum = 1;
  return (
    <div className={`${styles[colorList[omr.color]]}`}>
      <div className={`${styles.omr} ${styles.body}`}>
        {/* OMR TOP */}
        <Code />
        <div className={styles.omr_head}>
          <div className={styles.header}>답안지 교체</div>
          <div className={styles.header}>
            <Search />
          </div>
        </div>
        {/* OMR BODY */}
        <div className={styles.omr_body}>
          {/* 좌측: 정보확인란 */}
          <button type="button">&#10094;</button>
          <div className={styles.info}>
            <div className={`${styles.page}`}>
              <span className={`${styles.body}`}>{pageNum}</span>
              <span>교시 응원영역</span>
              <LinkCopy />
            </div>

            <Info title={'이  름'} content={`${user.nickname}`} />
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
          <button type="button">&#10095;</button>
        </div>
        <div className={styles.omr_footer} />
        <Code />
      </div>
    </div>
  );
}

export default OMR;
