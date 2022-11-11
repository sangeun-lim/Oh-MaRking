import React, { useCallback, useEffect, useState } from 'react';
// import { BsClipboardCheck, BsBackspace } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import LinkCopy from './LinkCopy';
import type { RootState } from '../../store/store';
import styles from './UseNotice.module.scss';

interface UseNoticeProps {
  omrBg: string[];
  isOwner: boolean;
}

function UseNotice({ omrBg, isOwner }: UseNoticeProps): JSX.Element {
  const { user } = useSelector((state: RootState) => state);

  return (
    <div className={styles.notice_font}>
      {isOwner ? (
        <div>
          &#8251; <LinkCopy />
          버튼을 눌러 지인들에게 응원받아보세요.
          <br />
          &#8251; 마지막 답안지에서 마킹이 20개 이상일 때, 새로운 답안지를 받을
          수 있습니다.
          <br />
          &#8251; 표기 안내
          <br />
          <div className={styles.rules}>
            <div className={styles.nubi}>
              <span className={`${styles[omrBg[0]]}`}>{''}</span>
              <span className={styles.noticetext}>작성 가능한 칸입니다.</span>
            </div>
            <div className={styles.nubi}>
              <span className={`${styles[omrBg[1]]}`}>{''}</span>
              <span>이미 읽은 칸입니다.</span>
            </div>
            <div className={styles.nubi}>
              <span className={`${styles[omrBg[2]]}`}>{''}</span>
              <span>아직 안 읽은 칸입니다.</span>
            </div>
            <div className={styles.nubi}>
              <span className={`${styles[omrBg[3]]}`}>{''}</span>
              <span>아직 읽을 수 없는 칸입니다.</span>
            </div>
            <div className={styles.nubi}>
              <span className={`${styles[omrBg[4]]}`}>{''}</span>
              <span>좋아요한 칸입니다.</span>
            </div>
          </div>
          <br />
        </div>
      ) : (
        <div>
          &#8251; 이 수험표는 {user.name}을 위한 응원수험표입니다.
          <br />
          &#8251; {user.name}을 위한 응원과 격려의 메시지를 작성해보세요! (폭언
          및 욕설은 금지!!)
          <br />
          &#8251; 빈 마킹란을 클릭하면 응원 메시지를 작성할 수 있습니다.
          <br />
          &#8251; 마지막 답안지에서 마킹이 20개 이상일 때, 새로운 답안지를 받을
          수 있습니다.
          <br />
          &#8251; 표기 안내
          <br />
          응원 메시지를 작성할 수 있습니다!
          <br />
          지금 읽을 수 있습니다!
          <br />
          아직 읽을 수 없습니다!
        </div>
      )}
    </div>
  );
}

export default UseNotice;
