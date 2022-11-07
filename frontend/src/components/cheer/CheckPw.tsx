import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import UpdateMsg from './UpdateMsg';
import OMRApi from '../../api/OMRApi';
import { EditNoteData } from '../../utils/Interface';
import { EditNoteDefaultData } from '../../utils/DefaultData';
import styles from './CheckPw.module.scss';

interface CheckPwProps {
  show: boolean;
  setShow: boolean | any;
  noteId: number;
}

function CheckPw({ show, setShow, noteId }: CheckPwProps): JSX.Element {
  const [pw, setPw] = useState<string>('');
  const [pass, setPass] = useState<boolean>(false);
  const [formData, setFormData] = useState<EditNoteData>(EditNoteDefaultData);

  const onChange = (e: any) => {
    setPw(e.target.value);
  };

  // const checkPw = async () => {
  //   // catch를 써서 에러스테이터스 해결
  //   let status = false;
  //   let data: any;
  //   await OMRApi.password
  //     .checkPw(noteId, pw)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         status = true;
  //         data = res.data.data;
  //       }
  //     })
  //     .catch((err) => console.log(err));

  //   if (status) {
  //     setFormData(data);
  //     setPass(true);
  //     alert('비밀번호가 일치합니다.');
  //   } else {
  //     setPass(false);
  //     alert('비밀번호가 일치하지 않습니다.');
  //   }
  // };

  const checkPw = async () => {
    try {
      const response = await OMRApi.password.checkPw(noteId, pw);
      if (response.status === 200) {
        console.log(response.data.data);
        setFormData(response.data.data);
        setPass(true);
        alert('비밀번호가 일치합니다.');
      }
    } catch (err) {
      setPass(false);
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
      {pass ? (
        <UpdateMsg
          pass={pass}
          setPass={setPass}
          noteId={noteId}
          formData={formData}
        />
      ) : (
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
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default CheckPw;
