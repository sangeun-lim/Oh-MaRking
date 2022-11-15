import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setShow, setUpdate } from '../../store/modal';
import { setUser } from '../../store/user';
import { RootState } from '../../store/store';
import { EditNote, EditNoteData } from '../../utils/Interface';
import UpdateMsg from './UpdateMsg';
import { EditDefaultNote, EditNoteDefaultData } from '../../utils/DefaultData';
import OMRApi from '../../api/OMRApi';
import styles from './DetailMsg.module.scss';
import '../../style/style.scss';
import { setIsOwner, setOmr, setNoteOpen, setNoteLike } from '../../store/omr';

function CantReadMsg(): JSX.Element {
  const dispatch = useDispatch();
  const { modal, omr, note, user, auth } = useSelector(
    (state: RootState) => state
  );
  const handleClose = () => {
    dispatch(setShow());
  };
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
  const [pw, setPw] = useState<string>('');
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editMsg, setEditMsg] = useState<EditNote>(EditDefaultNote);
  const [formData, setFormData] = useState<EditNoteData>(EditNoteDefaultData);
  const noteId = omr.noteInfo[modal.problemIdx][modal.elementIdx];

  const onChange = (e: any) => {
    setPw(e.target.value);
  };
  const onUpdateClick = () => {
    setOnEdit((state) => !state);
  };

  const checkPw = async () => {
    try {
      const response = await OMRApi.password.checkPw(noteId, pw);
      if (response.status === 200) {
        setFormData(response.data.data);
        dispatch(setUpdate());
      }
    } catch (err) {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm(
      '작성된 응원메시지를 삭제하시겠습니까?'
    );
    if (del) {
      try {
        await OMRApi.note.deleteNote(noteId);
        const { data } = await OMRApi.omr.getOmr(
          user.omrList[omr.pageNum],
          auth.isLoggedIn
        );
        dispatch(setUser(data.data.user));
        dispatch(setOmr(data.data.omr));
        dispatch(setIsOwner(data.data.isOwner));
        // dispatch로 새로운 omrList를 가 필요할듯?
        dispatch(setShow());
        alert('응원 메시지가 삭제되었습니다.');
      } catch (err) {
        console.log(err);
        alert('응원메시지를 삭제할 수 없습니다.');
      }
    }
  };

  const accessPw = async () => {
    await checkPw();
  };

  return (
    <div>
      {omr.isOwner ? (
        <div>
          {modal.show && modal.canNotRead ? (
            <Modal show={modal.show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>확인 불가</Modal.Title>
              </Modal.Header>
              <Modal.Body>아직 확인할 수 없는 메시지입니다.</Modal.Body>
            </Modal>
          ) : null}
        </div>
      ) : (
        <div>
          {modal.show && modal.canNotRead ? (
            <div>
              {modal.update ? (
                <UpdateMsg formData={formData} noteId={noteId} />
              ) : (
                <Modal
                  show={modal.show}
                  onHide={handleClose}
                  className={`${styles[colorList[omr.color]]} ${styles.test}`}
                >
                  <Modal.Header
                    style={{ backgroundColor: '#FBFFFE', border: '0px' }}
                    closeButton
                  >
                    <div className={styles.modalTitle}>
                      <Modal.Title>응원글 보기</Modal.Title>
                    </div>
                  </Modal.Header>
                  <Modal.Body style={{ backgroundColor: '#FBFFFE' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <div style={{ width: '100%', padding: '0px' }}>
                        <Row style={{ margin: '0px' }}>
                          <div className={styles.group}>
                            <Col>
                              <Row>
                                <Col className={`${styles.first_header}`}>
                                  <label
                                    className={styles.form_label}
                                    htmlFor="nickname"
                                  >
                                    닉네임
                                  </label>
                                </Col>
                                <Col className={`${styles.header}`}>
                                  <div>
                                    <input
                                      style={{ backgroundColor: '#FBFFFE' }}
                                      name="nickname"
                                      id="nickname"
                                      type="text"
                                      value={
                                        omr.nicknameInfo[modal.problemIdx][
                                          modal.elementIdx
                                        ]
                                      }
                                      maxLength={10}
                                      disabled
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                            <Col>
                              <Row>
                                <Col className={`${styles.header}`}>
                                  <label
                                    className={styles.form_label}
                                    htmlFor="opendate"
                                  >
                                    공개 날짜
                                  </label>
                                </Col>
                                <Col className={`${styles.header}`}>
                                  <div>
                                    <input
                                      style={{ backgroundColor: '#FBFFFE' }}
                                      name="showDate"
                                      type="date"
                                      id="opendate"
                                      value={
                                        omr.showDateInfo[modal.problemIdx][
                                          modal.elementIdx
                                        ]
                                      }
                                      disabled
                                    />
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </div>
                        </Row>
                      </div>
                    </div>
                    <br />
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
                            name="content"
                            placeholder="응원글을 작성해주세요."
                            id="cheer-text-detail"
                            value="아직 확인할 수 없는 메시지입니다."
                            style={{ backgroundColor: '#FBFFFE' }}
                            cols={30}
                            rows={5}
                            required
                            readOnly
                          />
                          {/* <DYEditor data={editMsg.content} readOnly /> */}
                          <ul style={{ margin: '0px' }}>
                            {onEdit ? (
                              <li>
                                <input
                                  className={styles.on_edit_input}
                                  id="pw"
                                  type="password"
                                  onChange={onChange}
                                  value={pw || ''}
                                  placeholder="비밀번호를 입력해주세요."
                                />
                                <button
                                  type="button"
                                  onClick={onUpdateClick}
                                  className={styles.btn_hover_border_3}
                                >
                                  뒤로
                                </button>
                                <button
                                  type="button"
                                  onClick={accessPw}
                                  className={styles.btn_hover_border_3}
                                >
                                  확인
                                </button>
                              </li>
                            ) : (
                              <li>
                                {!omr.isOwner && (
                                  <button
                                    className={styles.btn_hover_border_3}
                                    type="button"
                                    onClick={onUpdateClick}
                                  >
                                    수정
                                  </button>
                                )}
                                {omr.isOwner && (
                                  <button
                                    className={styles.btn_hover_border_3}
                                    type="button"
                                    onClick={onDeleteClick}
                                  >
                                    삭제
                                  </button>
                                )}
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default CantReadMsg;
