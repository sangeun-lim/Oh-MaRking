// import React from 'react';
// import { BsClipboardCheck, BsBackspace } from 'react-icons/bs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useSelector } from 'react-redux';
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
          <div className={styles.sort_text}>
            &#8251; <LinkCopy />
            버튼을 눌러 지인들에게 응원받아보세요.
          </div>
          <div className={styles.sort_text}>
            &#8251; 마지막 답안지에서 마킹이 20개 이상일 때,
          </div>
          <div style={{ marginLeft: '20px' }} className={styles.sort_text}>
            새로운 답안지를 받을 수 있습니다.
            <br />
            <br />
          </div>
          &#8251; 표기 안내
          <br />
          <Container>
            <div className={styles.rules}>
              <Row>
                <Col>
                  <div className={styles.nubi}>
                    <span className={`${styles[omrBg[0]]}`}>{''}</span>
                    <span className={styles.noticetext}>
                      {''}작성 가능한 칸
                    </span>
                  </div>
                </Col>
                <Col>
                  <div className={styles.nubi}>
                    <span className={`${styles[omrBg[1]]}`}>{''}</span>
                    <span className={styles.noticetext}>{''}이미 읽은 칸</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className={styles.nubi}>
                    <span className={`${styles[omrBg[2]]}`}>{''}</span>
                    <span className={styles.noticetext}>
                      {''}아직 안 읽은 칸
                    </span>
                  </div>
                </Col>
                <Col>
                  <div className={styles.nubi}>
                    <span className={`${styles[omrBg[3]]}`}>{''}</span>
                    <span className={styles.noticetext}>
                      {''}공개되지 않은 칸
                    </span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className={styles.nubi}>
                    <span className={`${styles[omrBg[4]]}`}>{''}</span>
                    <span className={styles.noticetext}>{''}좋아요한 칸</span>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      ) : (
        <div>
          <div className={styles.sort_text}>
            &#8251; 이 수험표는 {user.name}님을 위한 응원수험표입니다.
          </div>
          <div className={styles.sort_text}>
            &#8251; {user.name}님에게 응원과 격려의 메시지를 작성해보세요!
          </div>
          <div className={styles.sort_text}>(폭언, 욕설 금지!!!)</div>
          <div className={styles.sort_text}>
            &#8251; 마지막 답안지에서 마킹이 20개 이상일 때,
          </div>
          <div style={{ marginLeft: '20px' }} className={styles.sort_text}>
            새로운 답안지를 받을 수 있습니다.
            <br />
          </div>
          <br />
          &#8251; 표기 안내
          <Container>
            <div className={styles.rules}>
              <Row>
                <Col>
                  <div className={styles.nubi}>
                    <span className={`${styles[omrBg[0]]}`}>{''}</span>
                    <span className={styles.noticetext}>
                      {''}작성 가능한 칸
                    </span>
                  </div>
                </Col>
                <Col>
                  <div className={styles.nubi}>
                    <span className={`${styles[omrBg[1]]}`}>{''}</span>
                    <span className={styles.noticetext}>{''}이미 읽은 칸</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className={styles.nubi}>
                    <span className={`${styles[omrBg[3]]}`}>{''}</span>
                    <span className={styles.noticetext}>
                      {''}아직 안 읽은 칸
                    </span>
                  </div>
                </Col>
              </Row>
              {/* <br /> */}
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}

export default UseNotice;
