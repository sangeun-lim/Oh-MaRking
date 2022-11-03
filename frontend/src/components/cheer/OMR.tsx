import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateIntro } from '../../store/user';
import { stampUrl } from '../../utils/imgUrl';
import { changeColor } from '../../store/nowcolor';
import Search from './Search';
import { getKey, randomOmr } from '../../utils/utils';
import CreateMsg from './CreateMsg';
import styles from './OMR.module.scss';
import type { RootState } from '../../store/store';
// import { RootState } from 'modules';
// import { StateFromReducersMapObject } from '@reduxjs/toolkit';

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
  // OMR 문항 좌표 출력 함수
  const [show, setShow] = useState(false);
  const [problemNumber, setProblemNumber] = useState(0);
  const [elementNumber, setElementNumber] = useState(0);

  const openModal = (problemNum: number, elementNum: number) => {
    setShow(true);
    setProblemNumber(problemNum);
    setElementNumber(elementNum);
  };
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
        {msg.map((problemList, problemNum) => (
          <div className={styles.problem} key={getKey()}>
            <span>{problemNum + start + 1}</span>
            <div>
              {problemList.map((elementList, elementNum) => (
                <button
                  className={`${styles[omrBg[elementList]]}`}
                  key={getKey()}
                  type="button"
                  onClick={() =>
                    openModal(problemNum + start + 1, elementNum + 1)
                  }
                >
                  {elementList === 4 ? null : elementNum + 1}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div>
        {show && (
          <CreateMsg
            problemNum={problemNumber}
            elementNum={elementNumber}
            show={show}
            setShow={setShow}
          />
        )}
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
    // dispatch(changeColor(color));
    dispatch(updateIntro(`${color}`));
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
  const { nowColor, user } = useSelector((state: RootState) => state);
  // const { nowColor } = useSelector((state: RootState) => state);
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
    <div className={`${styles[colorList[nowColor]]}`}>
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
            <Cheer msg={randomOmr().slice(0, 10)} start={0} />
          </div>
          <div className={`${styles.cheer}`}>
            <Cheer msg={randomOmr().slice(10, 20)} start={10} />
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
