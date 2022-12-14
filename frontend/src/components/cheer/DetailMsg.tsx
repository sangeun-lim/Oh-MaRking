import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Toast } from '../common/Toast';
import { setIsOwner, setOmr, setNoteOpen, setNoteLike } from '../../store/omr';
import { setNote, setFavorite } from '../../store/note';
import { setShow, setUpdate } from '../../store/modal';
import { addLikeList, removeLikeItem } from '../../store/likeList';
import { setUser, setOmrList } from '../../store/user';
import { EditNote, EditNoteData } from '../../utils/Interface';
import { EditDefaultNote, EditNoteDefaultData } from '../../utils/DefaultData';
import UpdateMsg from './UpdateMsg';
import OMRApi from '../../api/OMRApi';
import { getLikeItem, isDeletedPage, COLOR_LIST } from '../../utils/utils';
import { RootState } from '../../store/store';
import styles from './DetailMsg.module.scss';
import '../../style/style.scss';

function DetailMsg(): JSX.Element {
  const dispatch = useDispatch();

  const { omr, user, auth, note, modal } = useSelector(
    (state: RootState) => state
  );

  const [pw, setPw] = useState<string>('');
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [onDelete, setOnDelete] = useState<boolean>(false);
  const [editMsg, setEditMsg] = useState<EditNote>(EditDefaultNote);
  const [formData, setFormData] = useState<EditNoteData>(EditNoteDefaultData);
  const noteId = omr.noteInfo[modal.problemIdx][modal.elementIdx];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const readMsg = async () => {
    const response = await OMRApi.note.getNote(noteId, omr.isOwner);
    if (response.status === 200) {
      setEditMsg(response.data.data);
      dispatch(setNote(response.data.data));
      const NoteData = {
        problemIdx: response.data.data.problemNum,
        elementIdx: response.data.data.checkNum,
      };
      dispatch(setNoteOpen(NoteData));
    } else {
      Toast('???????????? ???????????? ???????????????.', 'readMsgFail');
    }
  };

  useEffect(() => {
    readMsg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    dispatch(setShow());
  };

  const onUpdateClick = () => {
    setOnEdit((state) => !state);
  };

  const checkPwUpdate = async () => {
    try {
      const response = await OMRApi.password.checkPw(noteId, pw);
      if (response.status === 200) {
        setFormData(response.data.data);
        dispatch(setUpdate());
      }
    } catch (err) {
      Toast('??????????????? ???????????? ????????????.', 'checkPwFail');
    }
  };

  const accessPwUpdate = async () => {
    await checkPwUpdate();
  };

  const onDeleteClick = async () => {
    if (omr.isOwner) {
      const del: boolean = window.confirm(
        '????????? ?????????????????? ?????????????????????????'
      );
      if (del) {
        try {
          await OMRApi.note.deleteNote(noteId);
          const { data } = await OMRApi.omr.getOmr(
            user.omrList[omr.pageNum],
            auth.isLoggedIn
          );
          // let omrId = user.omrList[omr.pageNum];
          // const response = await OMRApi.note.deleteNote(noteId);
          // if (isDeletedPage(user.omrList, response.data.data.omrList)) {
          //   [omrId] = response.data.data.omrList;
          //   dispatch(setOmrList(response.data.data.omrList));
          // }
          // const { data } = await OMRApi.omr.getOmr(omrId, auth.isLoggedIn);
          dispatch(setUser(data.data.user));
          dispatch(setOmr(data.data.omr));
          dispatch(setIsOwner(data.data.isOwner));
          dispatch(setShow());
          if (!note.isFavorite) {
            const { content, nickname, problemNum, checkNum } = note;
            const payload = getLikeItem({
              noteId,
              content,
              nickname,
              pageNum: omr.pageNum,
              checkNum,
              problemNum,
            });
            dispatch(addLikeList(payload));
          } else {
            dispatch(removeLikeItem(noteId));
          }
          Toast('????????? ?????????????????????.', 'deleteNoteSuccess');
        } catch (err) {
          console.log(err);
          Toast('?????? ????????? ??????????????????.', 'deleteNoteFail');
        }
      }
    } else {
      setOnEdit((state) => state);
      setOnDelete((state) => !state);
    }
  };

  const checkPwDelete = async () => {
    try {
      await OMRApi.note.deleteNote(noteId);
      const { data } = await OMRApi.omr.getOmr(
        user.omrList[omr.pageNum],
        auth.isLoggedIn
      );
      // let omrId = user.omrList[omr.pageNum];
      // const response = await OMRApi.note.deleteNote(noteId);
      // if (isDeletedPage(user.omrList, response.data.data.omrList)) {
      //   [omrId] = response.data.data.omrList;
      //   dispatch(setOmrList(response.data.data.omrList));
      // }
      // const { data } = await OMRApi.omr.getOmr(omrId, auth.isLoggedIn);
      dispatch(setUser(data.data.user));
      dispatch(setOmr(data.data.omr));
      dispatch(setIsOwner(data.data.isOwner));
      dispatch(setShow());
      if (!note.isFavorite) {
        const { content, nickname, problemNum, checkNum } = note;
        const payload = getLikeItem({
          noteId,
          content,
          nickname,
          pageNum: omr.pageNum,
          checkNum,
          problemNum,
        });
        dispatch(addLikeList(payload));
      } else {
        dispatch(removeLikeItem(noteId));
      }
      Toast('????????? ?????????????????????.', 'deleteNoteSuccess');
    } catch (err) {
      console.log(err);
      Toast('?????? ????????? ??????????????????.', 'deleteNoteFail');
    }
  };

  const accessPwDelete = async () => {
    await checkPwDelete();
  };

  const onLikeClick = async () => {
    await OMRApi.note.likeNote(noteId, !note.isFavorite);
    const NoteData = {
      problemIdx: note.problemNum,
      elementIdx: note.checkNum,
    };
    dispatch(setNoteLike(NoteData)); // ?????? -> 4
    dispatch(setFavorite(!note.isFavorite)); // boolean
    if (!note.isFavorite) {
      const { content, nickname, problemNum, checkNum } = note;
      const payload = getLikeItem({
        noteId,
        content,
        nickname,
        pageNum: omr.pageNum,
        checkNum,
        problemNum,
      });
      dispatch(addLikeList(payload));
    } else {
      dispatch(removeLikeItem(noteId));
    }
  };

  return (
    <div>
      {modal.update ? (
        <UpdateMsg formData={formData} noteId={noteId} />
      ) : (
        <div>
          {modal.show && modal.detail && (
            <Modal
              show={modal.show}
              onHide={handleClose}
              className={`${styles[COLOR_LIST[omr.color]]} ${styles.test}`}
            >
              <Modal.Header
                style={{ backgroundColor: 'rgb(253 253 229)', border: '0px' }}
                closeButton
              >
                <div className={styles.modalTitle}>
                  <Modal.Title>?????? ??????</Modal.Title>
                </div>
              </Modal.Header>
              <Modal.Body style={{ backgroundColor: 'rgb(253 253 229)' }}>
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
                                ??????
                              </label>
                            </Col>
                            <Col className={`${styles.header}`}>
                              <div>
                                <input
                                  style={{
                                    backgroundColor: 'rgb(250, 250, 242)',
                                  }}
                                  name="nickname"
                                  id="nickname"
                                  type="text"
                                  value={editMsg.nickname}
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
                                ?????? ??????
                              </label>
                            </Col>
                            <Col className={`${styles.header}`}>
                              <div>
                                <input
                                  style={{
                                    backgroundColor: 'rgb(250, 250, 242)',
                                  }}
                                  name="showDate"
                                  type="date"
                                  id="opendate"
                                  value={editMsg.showDate}
                                  disabled
                                />
                              </div>
                            </Col>
                          </Row>
                        </Col>
                        {omr.isOwner ? (
                          <Col>
                            <Row>
                              <Col className={`${styles.header}`}>
                                <label
                                  className={styles.form_label}
                                  htmlFor="like"
                                >
                                  ????????????
                                </label>
                              </Col>
                              <Col className={`${styles.header}`}>
                                <div>
                                  {note.isFavorite ? (
                                    <input
                                      style={{
                                        fontWeight: '900',
                                        color: '#2ecc71',
                                        backgroundColor: 'rgb(250, 250, 242)',
                                      }}
                                      type="button"
                                      value="O"
                                      onClick={onLikeClick}
                                    />
                                  ) : (
                                    <input
                                      style={{
                                        fontWeight: 'bold',
                                        color: 'red',
                                        backgroundColor: 'rgb(250, 250, 242)',
                                      }}
                                      type="button"
                                      value="X"
                                      onClick={onLikeClick}
                                    />
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </Col>
                        ) : null}
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
                      ????????? ??????
                    </label>

                    <div
                      className={styles.body}
                      style={{ backgroundColor: 'rgb(250, 250, 242)' }}
                    >
                      <textarea
                        name="content"
                        placeholder="???????????? ??????????????????."
                        id="cheer-text-detail"
                        value={editMsg.content}
                        style={{ backgroundColor: 'rgb(250, 250, 242)' }}
                        cols={30}
                        rows={10}
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
                              placeholder="??????????????? ??????????????????."
                            />
                            <button
                              type="button"
                              onClick={onUpdateClick}
                              className={styles.btn_hover_border_3}
                            >
                              ??????
                            </button>
                            <button
                              type="button"
                              onClick={accessPwUpdate}
                              className={styles.btn_hover_border_3}
                            >
                              ??????
                            </button>
                          </li>
                        ) : (
                          <li>
                            {!omr.isOwner && !onDelete && (
                              <button
                                className={styles.btn_hover_border_3}
                                type="button"
                                onClick={onUpdateClick}
                              >
                                ??????
                              </button>
                            )}
                            {!onDelete && (
                              <button
                                className={styles.btn_hover_border_3}
                                type="button"
                                onClick={onDeleteClick}
                              >
                                ??????
                              </button>
                            )}
                          </li>
                        )}
                        {onDelete && (
                          <li>
                            <input
                              className={styles.on_edit_input}
                              id="pw"
                              type="password"
                              onChange={onChange}
                              value={pw || ''}
                              placeholder="??????????????? ??????????????????."
                            />
                            <button
                              type="button"
                              onClick={onDeleteClick}
                              className={styles.btn_hover_border_3}
                            >
                              ??????
                            </button>
                            <button
                              type="button"
                              onClick={accessPwDelete}
                              className={styles.btn_hover_border_3}
                            >
                              ??????
                            </button>
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
      )}
    </div>
  );
}

export default DetailMsg;
