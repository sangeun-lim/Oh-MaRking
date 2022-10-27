import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
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

  return (
    <div>
      <Modal show={show} onHide={handleClose} className={styles.test}>
        <Modal.Header closeButton>
          <Modal.Title>응원글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className={styles.cheerHeader}>
              <Form.Group
                className={styles.group}
                controlId="cheerForm.ControlInput1"
              >
                <div className={styles.header}>
                  <span>
                    <Form.Label className={styles.horization}>
                      닉네임
                    </Form.Label>
                  </span>
                  <span>
                    <Form.Control
                      type="text"
                      placeholder="닉네임을 입력해주세요"
                      className={styles.controlInput}
                      autoFocus
                    />
                  </span>
                </div>
              </Form.Group>
              <Form.Group
                className={styles.group}
                controlId="cheerForm.ControlInput2"
              >
                <div className={styles.header}>
                  <span>
                    <Form.Label className={styles.horization}>
                      비밀번호
                    </Form.Label>
                  </span>
                  <span>
                    <Form.Control
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      className={styles.controlInput}
                    />
                  </span>
                </div>
              </Form.Group>
              <Form.Group
                className={styles.group}
                controlId="cheerForm.ControlInput3"
              >
                <div className={styles.header}>
                  <span>
                    <Form.Label className={styles.horization}>
                      공개 날짜
                    </Form.Label>
                  </span>
                  <span>
                    <Form.Control
                      type="date"
                      placeholder="공개날짜를 입력해주세요"
                      className={styles.controlInput}
                    />
                  </span>
                </div>
              </Form.Group>
            </div>
            <div className={styles.cheerHeader}>
              <Form.Group
                className={styles.full_screen}
                controlId="cheerFrom.ControlTextarea1"
              >
                <Container>
                  <Row>
                    <Col xs={1}>
                      <Form.Label className={styles.vertical_lr}>
                        서술형 응원
                      </Form.Label>
                    </Col>
                    <Col xs={11}>
                      <Form.Control
                        className={styles.textarea}
                        as="textarea"
                        rows={3}
                      />
                    </Col>
                  </Row>
                </Container>
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            {problemNum + 1}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {elementNum + 1}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateMsg;
