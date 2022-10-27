import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './CreateMsg.module.scss';

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
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>응원글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="cheerForm.ControlInput1">
              <Form.Label>닉네임</Form.Label>
              <Form.Control
                type="text"
                placeholder="닉네임을 입력해주세요"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cheerForm.ControlInput2">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="cheerForm.ControlInput3">
              <Form.Label>공개 날짜</Form.Label>
              <Form.Control type="date" placeholder="공개날짜를 입력해주세요" />
            </Form.Group>
            <Form.Group
              className="{styles.textarea}"
              controlId="cheerFrom.ControlTextarea1"
            >
              <Form.Label>서술형 응원</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
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
