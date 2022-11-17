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
            &#8251; <LinkCopy />를 눌러, 내 <strong>OMR 카드</strong>를
            공유해보세요.
          </div>
          <div className={styles.sort_text}>
            &#8251; 소중한 메시지는 <strong>검토</strong>해보세요.
          </div>
          <div className={styles.sort_text}>
            &#8251; <strong>OMR</strong> 사용법은 시험 감독관을 통해 확인
            바랍니다.
            <br />
          </div>
          <div className={styles.sort_text}>
            &#8251; <strong>표기 안내</strong>
          </div>
          <div className={styles.container}>
            <Container>
              <div className={styles.rules}>
                <Row>
                  <Col>
                    <div className={styles.nubi}>
                      <span className={`${styles[omrBg[3]]}`}>{''}</span>
                      <span className={styles.noticetext}>
                        {''}아직 못보는 답안
                      </span>
                    </div>
                  </Col>
                  <Col>
                    <div className={styles.nubi}>
                      <span className={`${styles[omrBg[2]]}`}>{''}</span>
                      <span className={styles.noticetext}>
                        {''}읽지 않은 답안
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className={styles.nubi}>
                      <span className={`${styles[omrBg[4]]}`}>{''}</span>
                      <span className={styles.noticetext}>{''}검토할 답안</span>
                    </div>
                  </Col>
                  <Col>
                    <div className={styles.nubi}>
                      <span className={`${styles[omrBg[1]]}`}>{''}</span>
                      <span className={styles.noticetext}>{''}읽은 답안</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.sort_text}>
            &#8251; 여기는 {user.name}님의 응원 <strong>OMR 카드</strong>입니다.
          </div>
          <div className={styles.sort_text}>
            &#8251; 수험생에게
            <strong> 평소 전하지 못한 말</strong>이 있다면,
          </div>
          <div className={styles.sort_text} style={{ marginLeft: '20px' }}>
            <strong>OMR에 답안</strong>을 작성해보세요.
          </div>
          <div className={styles.sort_text}>
            &#8251; 메시지 작성법은 시험 감독관을 통해 확인바랍니다.
          </div>

          <div className={styles.sort_text}>
            &#8251; <strong>표기 안내</strong>
          </div>
          <div className={styles.container}>
            <Container>
              <div className={styles.rules}>
                <Row>
                  <Col>
                    <div className={styles.nubi}>
                      <span className={`${styles[omrBg[0]]}`}>{''}</span>
                      <span className={styles.noticetext}>
                        {''}작성 가능한 답안
                      </span>
                    </div>
                  </Col>
                  <Col>
                    <div className={styles.nubi}>
                      <span className={`${styles[omrBg[1]]}`}>{''}</span>
                      <span className={styles.noticetext}>
                        {''}작성 완료된 답안
                      </span>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className={styles.nubi}>
                      <span className={`${styles[omrBg[3]]}`}>{''}</span>
                      <span className={styles.noticetext}>
                        {''}공개되지 않은 답안
                      </span>
                    </div>
                  </Col>
                </Row>
              </div>
            </Container>
          </div>
        </div>
      )}
    </div>
  );
}

export default UseNotice;
