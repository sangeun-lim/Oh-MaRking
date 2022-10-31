import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './CheckPw.module.scss';

interface CheckPwProps {
  show: boolean;
  setShow: boolean | any;
}

function CheckPw({ show, setShow }: CheckPwProps): JSX.Element {
  const handleClose = () => setShow(false);
  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>비밀번호 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="cheerForm.ControlInput">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력해주세요"
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                취소
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                확인
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CheckPw;
