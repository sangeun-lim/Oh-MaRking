import { useEffect, useState } from 'react';
import api from '../../api/OMRApi';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DetailOrUpdateMsg from './DetailOrUpdateMsg';
import { NoteDetail } from '../../utils/Interface';
import { NoteDetailData } from '../../utils/DefaultData';
import styles from './CheckPw.module.scss';

interface CheckPwProps {
  show: boolean;
  setShow: boolean | any;
}

function CheckPw({ show, setShow }: CheckPwProps): JSX.Element {
  // 해당 omr을 읽었을때 받는 noteid정보를 가져와서 저장을 시켜야한다.
  // 해당하는 noteId를 자동으로 가져오게해야함
  const noteId = 0; //how?

  const [pw, setPw] = useState<string>('');
  const [pass, setPass] = useState(false);
  const [formData, setFormData] = useState<NoteDetail>(NoteDetailData);

  const onChange = (e: any) => {
    setPw(e.target.value);
  };

  useEffect(() => {}, [pw]);

  const checkPw = async () => {
    const response = await api.password.checkPw(noteId, pw);
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

              {/* 비밀번호가 일치하면 */}
              {/* noteId도 넘겨줘야됨 */}
              {pass ? (
                <DetailOrUpdateMsg
                  pass={pass}
                  setPass={setPass}
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
