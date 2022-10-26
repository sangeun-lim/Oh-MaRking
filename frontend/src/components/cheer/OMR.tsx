import Search from './Search';
import styles from './OMR.module.scss';

interface CheerProps {
  msg: number[][];
  start: number;
}

function Cheer({ msg, start }: CheerProps): JSX.Element {
  // Unique Key 생성 함수
  const getKey = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 || 0;
      const v = c === 'x' ? r : (r && 0x3) || 0x8;
      return v.toString(16);
    });
  };

  // OMR 문항 좌표 출력 함수
  const where = (problemNum: number, elementNum: number) => {
    console.log(problemNum, elementNum);
  };

  return (
    <ul>
      {msg.map((problemList, problemNum) => (
        <li key={getKey()}>
          <strong>{problemNum + start + 1}번 문제</strong>
          {problemList.map((elementList, elementNum) => (
            <button
              key={getKey()}
              type="button"
              onClick={() => where(problemNum + start, elementNum)}
            >
              [{elementNum + 1}]
            </button>
          ))}
        </li>
      ))}
    </ul>
  );
}

interface InfoProps {
  title: string;
  content: string;
}

function Info({ title, content }: InfoProps): JSX.Element {
  return (
    <div className={styles.info}>
      <div>
        <div>{title}</div>
        <div>{content}</div>
      </div>
    </div>
  );
}

function OMR(): JSX.Element {
  // 좌표 테스트용 OMR
  const temp = [
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
    [0, 1, 2, 3, 4],
  ];

  // 페이지네이션 테스트용 OMR
  const randomOmr = () => {
    const omr = Array.from(Array(20), () => new Array(5));
    for (let problem = 0; problem < 20; problem += 1) {
      for (let element = 0; element < 5; element += 1) {
        omr[problem][element] = Math.floor(Math.random() * 5);
      }
    }
    return omr;
  };
  return (
    <div className={styles.yellow_sheet}>
      {/* OMR TOP */}
      <div className={styles.omr_top}>
        <div>새 페이지 작성</div>
        <Search />
      </div>
      {/* OMR BODY */}
      <div className={styles.omr_body}>
        {/* 좌측: 정보확인란 */}
        <div className={styles.info}>
          정보칸
          <Info title={'이름'} content={'노은영'} />
          <Info
            title={'필적 확인란'}
            content={'안녕하세요. 저는 노은영입니다.'}
          />
          <div>
            <div>주의사항</div>
            <div>응원하고 싶은 칸을 골라서 응원메세지를 작성해주세요</div>
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
  );
}

export default OMR;
