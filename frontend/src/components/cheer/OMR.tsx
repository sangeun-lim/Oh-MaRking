import { getKey, temp, randomOmr } from '../../utils/utils';
import Search from './Search';
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
  const where = (problemNum: number, elementNum: number) => {
    console.log(problemNum, elementNum);
  };

  return (
    <ul>
      {msg.map((problemList, problemNum) => (
        <li key={getKey()}>
          <strong className={styles.header}>{problemNum + start + 1}</strong>
          <div className={styles.body}>
            {problemList.map((elementList, elementNum) => (
              <button
                key={getKey()}
                type="button"
                onClick={() => where(problemNum + start, elementNum)}
              >
                [{elementNum + 1}]
              </button>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
}

function Info({ title, content }: InfoProps): JSX.Element {
  return (
    <div className={styles.sections}>
      <div className={(styles.title, styles.header)}>{title}</div>
      <div className={(styles.content, styles.body)}>{content}</div>
    </div>
  );
}

function OMR(): JSX.Element {
  const color = ['skyblue_ver', 'yellow_ver'];
  return (
    <div className={styles[color[0]]}>
      <div className={`${styles.sheet} ${styles.body}`}>
        {/* OMR TOP */}
        <div className={styles.omr_top}>
          <div className={styles.header}>새 페이지 작성</div>
          <div className={styles.header}>
            <Search />
          </div>
        </div>
        {/* OMR BODY */}
        <div className={styles.omr_body}>
          {/* 좌측: 정보확인란 */}
          <div className={styles.info}>
            <Info title={'이름'} content={'노은영'} />
            <Info
              title={'필적 확인란'}
              content={'안녕하세요. 저는 노은영입니다.'}
            />
            <div>
              <div className={(styles.title, styles.header)}>주의사항</div>
              <div className={styles.body}>
                응원하고 싶은 칸을 골라서 응원메세지를 작성해주세요
              </div>
            </div>
            <Info title={'감독 확인란'} content={''} />
          </div>
          {/* 그 외:응원구역 */}
          <div className={styles.cheer}>
            <Cheer msg={temp.slice(0, 10)} start={0} />
          </div>
          <div className={styles.cheer}>
            <Cheer msg={temp.slice(10, 20)} start={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OMR;
