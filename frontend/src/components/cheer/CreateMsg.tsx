import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './CreateMsg.module.scss';
import '../../style/style.scss';

interface CreateMsgProps {
  problemNum: number;
  elementNum: number;
  show: any;
  setShow: boolean | any;
}

function CreateMsg({
  problemNum,
  elementNum,
  show,
  setShow,
}: CreateMsgProps): JSX.Element {
  const handleClose = () => setShow(false);
  // 비밀번호 양식
  // const [pwCheck, setPwCheck] = useState<boolean>(false);
  // // 비밀번호 중복 체크
  // const [pwCommomCheck, setPwCommonCheck] = useState<boolean>(false);

  // const checkValid = () => setPwCheck(true);
  // const checkCommon = () => setPwCommonCheck(true);

  // const passwordValid = function () {};

  // const passwordCheckValid = function () {};
  return (
    <div>
      <Modal show={show} onHide={handleClose} className={styles.test}>
        <Modal.Header closeButton>
          <Modal.Title>응원글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ margin: 'auto', padding: '0px' }}>
                {/* <Container> */}
                <Row style={{ margin: '0px' }}>
                  <div className={styles.group}>
                    <Col>
                      {/* <Container> */}
                      <Row>
                        <Col>
                          <label
                            className={styles.form_label}
                            htmlFor="nickname"
                          >
                            닉네임
                          </label>
                        </Col>
                        <Col>
                          <div>
                            <input
                              id="nickname"
                              type="text"
                              placeholder="닉네임을 입력해주세요."
                              maxLength={10}
                            />
                          </div>
                        </Col>
                      </Row>
                      {/* </Container> */}
                    </Col>
                    <Col>
                      {/* <Container> */}
                      <Row>
                        <Col>
                          <label
                            className={styles.form_label}
                            htmlFor="opendate"
                          >
                            공개 날짜
                          </label>
                        </Col>
                        <Col>
                          <div>
                            <input type="date" id="opendate" />
                          </div>
                        </Col>
                      </Row>
                      {/* </Container> */}
                    </Col>
                  </div>
                </Row>
                {/* </Container> */}

                {/* <Container> */}
                <Row style={{ margin: '0px' }}>
                  <div className={styles.group}>
                    <Col>
                      {/* <Container> */}
                      <Row>
                        <Col>
                          <label
                            className={styles.form_label}
                            htmlFor="password"
                          >
                            비밀번호
                          </label>
                        </Col>
                        <Col>
                          <div>
                            <input
                              id="password"
                              type="password"
                              placeholder="비밀번호를 입력해주세요."
                            />
                          </div>
                        </Col>
                      </Row>
                      {/* </Container> */}
                    </Col>
                    <Col>
                      {/* <Container> */}
                      <Row>
                        <Col>
                          <label
                            className={styles.form_label}
                            htmlFor="password-check"
                          >
                            비밀번호 확인
                          </label>
                        </Col>
                        <Col>
                          <div>
                            <input
                              id="password-check"
                              type="password-check"
                              placeholder="동일한 비밀번호를 입력하세요."
                            />
                          </div>
                        </Col>
                      </Row>
                      {/* </Container> */}
                    </Col>
                  </div>
                </Row>
                {/* </Container> */}
              </div>
            </div>
            <br />
            <div className={styles.cheerHeader}>
              <label className={styles.vertical_lr} htmlFor="cheer-text">
                서술형 응원
              </label>
              <textarea
                placeholder="응원글을 작성해주세요."
                name="cheer-text"
                id="cheer-text"
                cols={30}
                rows={10}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {problemNum}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {elementNum}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateMsg;
