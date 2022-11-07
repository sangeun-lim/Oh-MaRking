import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import UpdateMsg from './UpdateMsg';
import OMRApi from '../../api/OMRApi';
import { NewNoteData } from '../../utils/Interface';
import { NewNoteDefaultData } from '../../utils/DefaultData';
import styles from './CheckPw.module.scss';

interface CheckPwProps {
  show: boolean;
  setShow: boolean | any;
  noteId: number;
}

function CheckPw({ show, setShow, noteId }: CheckPwProps): JSX.Element {
  const [pw, setPw] = useState<string>('');
  const [pass, setPass] = useState(false);
  const [formData, setFormData] = useState<NewNoteData>(NewNoteDefaultData);

  const onChange = (e: any) => {
    setPw(e.target.value);
  };

  const checkPw = async () => {
    const response = await OMRApi.password.checkPw(noteId, pw);
    if (response.status === 200) {
      alert('비밀번호가 일치합니다.');
      setPass(true);
      setFormData(response.data);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  // 취소 버튼 눌렀을 때
  const handleClose = () => setShow(false);

  // 확인 버튼 눌렀을 때
  const accessPw = () => {
    checkPw();
  };

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
                value={pw || ''}
                placeholder="비밀번호를 입력해주세요"
                required
              />
            </Form.Group>
            <Modal.Footer>
              <ul>
                <li>
                  <button type="button" onClick={handleClose}>
                    취소
                  </button>
                </li>
                <li>
                  <button type="button" onClick={accessPw}>
                    확인
                  </button>
                </li>
              </ul>
              {pass ? (
                <UpdateMsg
                  pass={pass}
                  setPass={setPass}
                  noteId={noteId}
                  formData={formData}
                />
              ) : null}
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CheckPw;
