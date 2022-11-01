import { useEffect, useState } from 'react';
import api from '../../api/OMRApi';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styles from './CheckPw.module.scss';

interface CheckPwProps {
  show: boolean;
  setShow: boolean | any;
}

function CheckPw({ show, setShow }: CheckPwProps): JSX.Element {
  // 해당하는 noteId를 자동으로 가져오게해야함
  const noteId = 0; //how?

  const [pw, setPw] = useState<string>('');
  const [pass, setPass] = useState<boolean>(false);

  const onChange = (e: any) => {
    setPw(e.target.value);
  };

  useEffect(() => {}, [pw]);

  const checkPw = async () => {
    const response = await api.password.checkPw(noteId, pw);
    if (response.status === 200) {
      alert('비밀번호가 일치합니다.');
      setPass(true);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

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
                onChange={onChange}
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
