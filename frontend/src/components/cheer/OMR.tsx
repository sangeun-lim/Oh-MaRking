import { useState } from 'react';
import { getKey, randomOmr } from '../../utils/utils';
// import { style } from '@mui/system';
import Search from './Search';
import CreateMsg from './CreateMsg';
import styles from './OMR.module.scss';

interface CheerProps {
  msg: number[][];
  start: number;
}

interface InfoProps {
  title: string;
  content: string;
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
                  className={styles.before_marking}
                  key={getKey()}
                  type="button"
                  onClick={() =>
                    openModal(problemNum + start + 1, elementNum + 1)
                  }
                >
                  {elementNum + 1}
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
          <img
            src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/%EA%B0%90%EB%8F%85%ED%99%95%EC%9D%B8%EB%9E%802.png?alt=media&token=d15291fc-453b-418c-9a7c-705ac3a4601c"
            alt="감독은 노녕과 아이들"
          />
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

// function Pallet(): JSX.Element {
//   const colors = [0, 1, 2, 3, 4, 5];
//   return ( {colors.map((color) => <button type="button" key={} ></button>);
// }
function OMR(): JSX.Element {
  const color = ['skyblue_ver', 'yellow_ver'];
  const pageNum = 1;
  return (
    <div className={styles[color[1]]}>
      <div className={`${styles.omr} ${styles.body}`}>
        {/* OMR TOP */}
        <Code />
        <div className={styles.omr_head}>
          <div className={styles.header}>새 페이지 작성</div>
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

            <Info title={'이  름'} content={'누구게요'} />
            <Info
              title={'필  적\n확인란'}
              content={'안녕하세요ㅇwㅇ\n저는 김동유  입니다.'}
            />
            <div>
              <div className={`${styles.header} ${styles.top}`}>주의사항</div>
              <div className={`${styles.body} ${styles.bottom}`}>
                응원하고 싶은 칸을 골라서 응원메세지를 작성해주세요
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
