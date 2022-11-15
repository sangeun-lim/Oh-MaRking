import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
// import DYEditor, { getData } from 'dyeditor';
import { setIsOwner, setOmr, setNoteOpen, setNoteLike } from '../../store/omr';
import { setNote, setFavorite } from '../../store/note';
import { setShow, setUpdate } from '../../store/modal';
import { addLikeList, removeLikeItem } from '../../store/likeList';
import { setUser } from '../../store/user';
import { EditNote, EditNoteData } from '../../utils/Interface';
import { EditDefaultNote, EditNoteDefaultData } from '../../utils/DefaultData';
import UpdateMsg from './UpdateMsg';
import OMRApi from '../../api/OMRApi';
import { RootState } from '../../store/store';
import { heartUrl, heartFillUrl } from '../../utils/imgUrl';
import { getLikeItem } from '../../utils/utils';
import styles from './DetailMsg.module.scss';
import '../../style/style.scss';

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    container: `${styles.container_class}`,
    confirmButton: 'green',
    cancelButton: 'red',
    // width: 300,
  },
  buttonsStyling: false,
});

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

  // function asdf(nickname: string, content: string, showData: string) {
  //   const _editMsg = { ...editMsg, nickname, content, showData };
  //   setEditMsg(_editMsg);
  // }

  const onChange = (e: any) => {
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
      alert('메시지를 불러오지 못했습니다.');
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
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const accessPwUpdate = async () => {
    await checkPwUpdate();
  };

  const onDeleteClick = async () => {
    if (omr.isOwner) {
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
          alert('응원 메시지가 삭제되었습니다.');
        } catch (err) {
          console.log(err);
          alert('응원메시지를 삭제할 수 없습니다.');
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
      dispatch(setUser(data.data.user));
      dispatch(setOmr(data.data.omr));
      dispatch(setIsOwner(data.data.isOwner));
      // dispatch로 새로운 omrList를 가 필요할듯?
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
      alert('응원 메시지가 삭제되었습니다.');
    } catch (err) {
      console.log(err);
      alert('응원메시지를 삭제할 수 없습니다.');
    }
  };

  const accessPwDelete = async () => {
    await checkPwDelete();
  };

  const onLikeClick = async (e: any) => {
    await OMRApi.note.likeNote(noteId, !note.isFavorite);
    const NoteData = {
      problemIdx: note.problemNum,
      elementIdx: note.checkNum,
    };
    dispatch(setNoteLike(NoteData)); // 숫자 -> 4
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
              className={`${styles[colorList[omr.color]]} ${styles.test}`}
            >
              <Modal.Header
                style={{ backgroundColor: '#FBFFFE', border: '0px' }}
                closeButton
              >
                <div className={styles.modalTitle}>
                  <Modal.Title>응원글 보기</Modal.Title>
                  {omr.isOwner ? (
                    <div>
                      {note.isFavorite ? (
                        <div style={{ width: '1em', height: '1em' }}>
                          <button
                            style={{ width: '100%', height: '100%' }}
                            type="button"
                            onClick={onLikeClick}
                          >
                            <img
                              style={{ width: '100%', height: '100%' }}
                              // src={heartUrl}
                              src={heartFillUrl}
                              alt=""
                            />
                          </button>
                        </div>
                      ) : (
                        // <BsSuitHeart onClick={onLikeClick} />
                        <div style={{ width: '1em', height: '1em' }}>
                          <button
                            style={{ width: '100%', height: '100%' }}
                            type="button"
                            onClick={onLikeClick}
                          >
                            <img
                              style={{ width: '100%', height: '100%' }}
                              src={heartUrl}
                              alt="바보"
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : null}
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
                                  value={editMsg.showDate}
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
                        value={editMsg.content}
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
                              onClick={accessPwUpdate}
                              className={styles.btn_hover_border_3}
                            >
                              확인
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
                                수정
                              </button>
                            )}
                            {!onDelete && (
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
                        {onDelete && (
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
                              onClick={onDeleteClick}
                              className={styles.btn_hover_border_3}
                            >
                              뒤로
                            </button>
                            <button
                              type="button"
                              onClick={accessPwDelete}
                              className={styles.btn_hover_border_3}
                            >
                              확인
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
