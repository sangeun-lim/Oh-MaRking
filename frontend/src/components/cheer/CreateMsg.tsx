import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NoteData } from '../../utils/Interface';
import { NoteDefaultData } from '../../utils/DefaultData';
// import { NoteData } from 'utils/Interface';
// import { NoteDefaultData } from 'utils/DefaultData';
import styles from './CreateMsg.module.scss';
import '../../style/style.scss';

interface CreateMsgProps {
  problemNum: number;
  elementNum: number;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateMsg({
  problemNum,
  elementNum,
  show,
  setShow,
}: CreateMsgProps): JSX.Element {
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const password1 = '';
  const password2 = '';
  // // 노트에 넣어야되는 데이터
  const [newNote, setNewNote] = useState<NoteData>(NoteDefaultData);
  // 비밀번호 일치 체크
  const [pass, setPass] = useState<boolean>(true);
  // const [password]
  // const checkValid = () => setPwCheck(true);
  // const checkCommon = () => setPwCommonCheck(true);
  // const passwordValid = function () {};
  const passwordCheckValid = function () {
    if (newNote.password1 === newNote.password2) {
      setPass(true);
    } else {
      setPass(false);
    }
  };
  // 비밀 >_0
  document
    .querySelector('#password-check')
    ?.addEventListener('focusout', passwordCheckValid);

  // useEffect(() => {

  // });
  // useEffect(() => {
  //   console.log('노으녕');
  // }, [newNote]);

  // // 노트에 쓰는 모든 값들이 입력하면서 바뀔때마다 값 바꿔주는 함수
  const onChange = (e: any) => {
    const { name, value } = e.target;
    setNewNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // // 취소버튼 눌렀을 때
  // const onCancelClick = () => {
  //   // 작성하려던 유저의 페이지로 이동
  //   navigate('/cheer/asf');
  // };

  // const onSubmit = async (e: any) => {
  //   e.preventDefault();
  //   // 조건주고 axios 받고 등등의 제출할때 필요한 처리해주는 함수
  // };

  return (
    <div>
      <Modal show={show} onHide={handleClose} className={styles.test}>
        <Modal.Header closeButton>
          <Modal.Title>응원글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', padding: '0px' }}>
                <Row style={{ margin: '0px' }}>
                  <div className={styles.group}>
                    <Col>
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
                              name="nickname"
                              id="nickname"
                              type="text"
                              placeholder="닉네임을 입력해주세요."
                              onChange={onChange}
                              maxLength={10}
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
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
                    </Col>
                  </div>
                </Row>

                <Row style={{ margin: '0px' }}>
                  <div className={styles.group}>
                    <Col>
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
                              name="password1"
                              id="password"
                              type="password"
                              placeholder="비밀번호를 입력해주세요."
                              value={newNote.password1}
                              onChange={onChange}
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
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
                              name="password2"
                              id="password-check"
                              type="password"
                              placeholder="동일한 비밀번호를 입력하세요."
                              value={newNote.password2}
                              onChange={onChange}
                              // value={newNote.password2}
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </div>
                </Row>
              </div>
            </div>
            {!pass ? <div>비밀번호가 일치하지 않습니다.</div> : null}

            <br />
            <div className={styles.cheer_box}>
              <div className={styles.cheerHeader}>
                <label className={styles.vertical_lr} htmlFor="cheer-text">
                  서술형 응원
                </label>
                <div>
                  <textarea
                    placeholder="응원글을 작성해주세요."
                    name="content"
                    id="cheer-text"
                    onChange={onChange}
                    cols={30}
                    rows={5}
                  />
                  <ul>
                    <li>
                      <button
                        className={styles.btn_hover_border_3}
                        type="button"
                        onClick={handleClose}
                      >
                        응원하기
                      </button>
                    </li>
                    <li>
                      <button
                        className={styles.btn_hover_border_3}
                        type="button"
                        onClick={handleClose}
                      >
                        응원취소
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateMsg;
