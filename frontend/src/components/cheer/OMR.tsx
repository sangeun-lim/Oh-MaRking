import Search from './Search';
import styles from './OMR.module.scss';
import { Children } from 'react';

interface CheerProps {
  msg: number[][];
}

function Cheer({ msg }: CheerProps): JSX.Element {
  return (
    <ul>
      {Children.toArray()}
      {msg.map((problem, i) => (
        <li key={i}>
          문제번호{i}
          {problem.map((element, index) => (
            <div key={index}>{element}</div>
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
  const temp = [
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
    [0, 1, 2, 3, 4, 5],
  ];
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
        <Cheer msg={temp.slice(0, 11)} />
        <Cheer msg={temp.slice(11, 23)} />
      </div>
    </div>
  );
}

export default OMR;
