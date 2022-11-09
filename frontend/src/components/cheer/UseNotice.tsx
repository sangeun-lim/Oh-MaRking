import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store/store';
import styles from './UseNotcie.module.scss';

interface UseNoticeProps {
  omrBg: string[];
  isOwner: boolean;
}

function UseNotice({ omrBg, isOwner }: UseNoticeProps): JSX.Element {
  const { user } = useSelector((state: RootState) => state);

  return (
    <div>
      {isOwner ? (
        <div>
          &#8251; 이름 옆의 링크복사를 통해 다른 사람들에게 응원메시지를
          요청해보세요!
          <br />
          &#8251; 마지막 답안지에서 마킹이 20개 이상일 때, 새로운 답안지를 받을
          수 있습니다.
          <br />
          &#8251; 표기 안내
          <br />
          <div className={`${styles[omrBg[0]]}`}>작성 가능한 칸입니다.</div>
          <br />
          <div className={`${styles[omrBg[1]]}`}>이미 읽은 칸입니다.</div>
          <br />
          <div className={`${styles[omrBg[2]]}`}>아직 안 읽은 칸입니다.</div>
          <br />
          <div className={`${styles[omrBg[3]]}`}>
            아직 읽을 수 없는 칸입니다.
          </div>
          <br />
          <div className={`${styles[omrBg[4]]}`}>좋아요한 칸입니다.</div>
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
