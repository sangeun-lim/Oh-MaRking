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
        <span>응</span>
        <span>원</span>
        <span>한</span>
        <span>마</span>
        <span>디</span>
      </div>
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
      <div className={` ${styles.body} ${styles.right}`}>{content}</div>
    </div>
  );
}

function OMR(): JSX.Element {
  const color = ['skyblue_ver', 'yellow_ver'];
  const pageNum = 1;
  return (
    <div className={styles[color[0]]}>
      <div className={`${styles.omr} ${styles.body}`}>
        {/* OMR TOP */}
        <div className={styles.omr_head}>
          <div className={styles.header}>새 페이지 작성</div>
          <div className={styles.header}>
            <Search />
          </div>
        </div>
        {/* OMR BODY */}
        <div className={styles.omr_body}>
          {/* 좌측: 정보확인란 */}
          <div className={styles.info}>
            <div className={`${styles.page}`}>
              <span className={`${styles.body}`}>{pageNum}</span>
              <span>교시 응원영역</span>
            </div>

            <Info title={'이름'} content={'누구게요'} />
            <Info
              title={'필적  확인란'}
              content={'안녕하세요. 저는 김동입니다.'}
            />
            <div>
              <div className={`${styles.header} ${styles.top}`}>주의사항</div>
              <div className={`${styles.body} ${styles.bottom}`}>
                응원하고 싶은 칸을 골라서 응원메세지를 작성해주세요
              </div>
            </div>
            <Info title={'감독  확인란'} content={''} />
          </div>
          {/* 그 외: 응원구역 */}
          <div className={`${styles.cheer}`}>
            <Cheer msg={randomOmr().slice(0, 10)} start={0} />
          </div>
          <div className={`${styles.cheer}`}>
            <Cheer msg={randomOmr().slice(10, 20)} start={10} />
          </div>
        </div>
        <div className={styles.omr_footer} />
      </div>
    </div>
  );
}

export default OMR;
