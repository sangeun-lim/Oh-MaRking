import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FormEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NewNoteData } from '../../utils/Interface';
import { NewNoteDefaultData } from '../../utils/DefaultData';
import OMRApi from '../../api/OMRApi';
import type { RootState } from '../../store/store';
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
  const { omr } = useSelector((state: RootState) => state);
  const navigate = useNavigate();

  const colorList = [
    'yellow',
    'skyblue',
    'purple',
    'green',
    'dark_yellow',
    'navy',
    'orange',
    'pink',
  ];

  interface PW {
    password1: string;
    password2: string;
  }
  const PWData = {
    password1: '',
    password2: '',
  };
  const [pwd, setPwd] = useState<PW>(PWData);

  // // 노트에 넣어야되는 데이터
  const [newNote, setNewNote] = useState<NewNoteData>(NewNoteDefaultData);
  const [disable, setDisable] = useState<boolean>(true);
  // 비밀번호 일치 체크
  const [pass, setPass] = useState<boolean>(true);

  const passwordCheckValid = () => {
    if (pwd.password1 === pwd.password2) {
      setPass(true);
      setDisable(false);
    } else {
      setPass(false);
      setDisable(true);
    }
  };

  // 비밀 >_0
  document
    .querySelector('#password-check')
    ?.addEventListener('focusout', passwordCheckValid);
  document
    .querySelector('#password-check')
    ?.addEventListener('focusin', () => setPass(true));

  // // 노트에 쓰는 모든 값들이 입력하면서 바뀔때마다 값 바꿔주는 함수
  const onChangeData = (e: any) => {
    const { name, value } = e.target;
    setNewNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClose = () => setShow(false);

  const onChangePwd = (e: any) => {
    const { name, value } = e.target;
    setPwd((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const { omrList } = useSelector((state: RootState) => state.user);
  const { pageNum } = useSelector((state: RootState) => state.omr);

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      omrId: omrList[pageNum],
      nickname: newNote.nickname,
      content: newNote.content,
      pwd: pwd.password1,
      showDate: newNote.showDate,
      problemNum,
      checkNum: elementNum,
    };
    // console.log(formData);
    const response = await OMRApi.note.createNote(formData);
    if (response.status === 201) {
      console.log(response.data);
      setNewNote(response.data.data);
      setShow(false);
    }
  };
  // // 취소버튼 눌렀을 때
  // const onCancelClick = () => {
  //   // 작성하려던 유저의 페이지로 이동
  //   navigate(`/cheer/`${codedEmail}`);
  // };

  useEffect(() => {
    // console.log(document.querySelector('#ASDF').parentNode?.parentNode);
  }, []);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        className={`${styles[colorList[omr.color]]} ${styles.test}`}
      >
        <Modal.Header
          style={{ backgroundColor: '#FBFFFE', border: '0px' }}
          closeButton
        >
          <Modal.Title>응원글 작성</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#FBFFFE' }}>
          <form onSubmit={handleOnSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', padding: '0px' }}>
                <Row style={{ margin: '0px' }}>
                  {/* <div className={styles.group}> */}
                  <div className={styles.group}>
                    <Col>
                      <Row>
                        <Col
                          className={`${styles.first_header} ${styles.bottom_header}`}
                        >
                          <label
                            className={`${styles.form_label}`}
                            htmlFor="nickname"
                          >
                            닉네임
                          </label>
                        </Col>
                        <Col
                          className={`${styles.header} ${styles.bottom_header}`}
                        >
                          <div>
                            <input
                              style={{ backgroundColor: '#FBFFFE' }}
                              name="nickname"
                              id="nickname"
                              type="text"
                              placeholder="닉네임을 입력해주세요."
                              onChange={onChangeData}
                              maxLength={10}
                              required
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Col
                          className={`${styles.header} ${styles.bottom_header}`}
                        >
                          <label
                            className={styles.form_label}
                            htmlFor="showDate"
                          >
                            공개 날짜
                          </label>
                        </Col>
                        <Col
                          className={`${styles.header} ${styles.bottom_header}`}
                        >
                          <div>
                            <input
                              style={{ backgroundColor: '#FBFFFE' }}
                              type="date"
                              name="showDate"
                              id="showDate"
                              // value={newNote.showDate}
                              onChange={onChangeData}
                              required
                            />
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
                        <Col className={styles.first_header}>
                          <label
                            className={styles.form_label}
                            htmlFor="password"
                          >
                            비밀번호
                          </label>
                        </Col>
                        <Col className={styles.header}>
                          <div>
                            <input
                              style={{ backgroundColor: '#FBFFFE' }}
                              name="password1"
                              id="password"
                              type="password"
                              placeholder="비밀번호를 입력해주세요."
                              value={pwd.password1}
                              onChange={onChangePwd}
                              required
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col>
                      <Row>
                        <Col className={styles.header}>
                          <label
                            className={styles.form_label}
                            htmlFor="password-check"
                          >
                            비밀번호 확인
                          </label>
                        </Col>
                        <Col className={styles.header}>
                          <div>
                            <input
                              style={{ backgroundColor: '#FBFFFE' }}
                              name="password2"
                              id="password-check"
                              type="password"
                              placeholder="동일한 비밀번호를 입력하세요."
                              value={pwd.password2}
                              onChange={onChangePwd}
                              required
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
            {/* <div className={`${styles.cheer_box}`}> */}
            <div>
              <div className={`${styles.cheerHeader}`}>
                <label
                  className={`${styles.vertical_lr} ${styles.first_header}`}
                  htmlFor="cheer-text"
                >
                  서술형 응원
                </label>
                <div className={styles.body}>
                  <textarea
                    placeholder="응원글을 작성해주세요."
                    name="content"
                    id="cheer-text"
                    onChange={onChangeData}
                    style={{ backgroundColor: '#FBFFFE' }}
                    cols={30}
                    rows={5}
                    required
                  />
                  <ul style={{ margin: '0px' }}>
                    <li>
                      <button
                        className={styles.btn_hover_border_3}
                        type="submit"
                        disabled={disable}
                        // value="응원하기"
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
