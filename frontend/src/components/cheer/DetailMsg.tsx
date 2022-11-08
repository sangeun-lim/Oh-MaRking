import React, { Dispatch, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setIsOwner, setOmr, setNoteOpen, setNoteLike } from '../../store/omr';
import { setNote, setFavorite } from '../../store/note';
import { setUser } from '../../store/user';
import { EditNote } from '../../utils/Interface';
import { EditDefaultNote } from '../../utils/DefaultData';
import OMRApi from '../../api/OMRApi';
import { RootState } from '../../store/store';
import styles from './CreateMsg.module.scss';
import '../../style/style.scss';

interface Props {
  setPass: Dispatch<React.SetStateAction<boolean>>;
  setShow: Dispatch<React.SetStateAction<boolean>>;
  pass: boolean;
  noteId: number;
}

function DetailMsg({ setPass, pass, noteId, setShow }: Props): JSX.Element {
  const dispatch = useDispatch();

  const { omr, user, auth, note } = useSelector((state: RootState) => state);

  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editMsg, setEditMsg] = useState<EditNote>(EditDefaultNote);

  const readMsg = async () => {
    const response = await OMRApi.note.readNote(noteId);
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

  const onEditClick = () => {
    setOnEdit(!onEdit);
  };

  const handleClose = () => {
    setPass(false);
    setShow(false);
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
        setPass(false);
        setShow(false);
        alert('응원 메시지가 삭제되었습니다.');
        // dispatch로 새로운 omrList를 갱신해주는 코드가 필요할듯?
      } catch (err) {
        console.log(err);
        alert('응원메시지를 삭제할 수 없습니다.');
      }
    }
    onEditClick();
  };

  const onLikeClick = async (e: any) => {
    e.preventDefault();

    await OMRApi.note.likeNote(noteId, !note.isFavorite);
    const NoteData = {
      problemIdx: note.problemNum,
      elementIdx: note.checkNum,
    };
    dispatch(setFavorite(!note.isFavorite));
    dispatch(setNoteLike(NoteData));
  };

  return (
    <div>
      <Modal show={pass} onHide={handleClose} className={styles.test}>
        <Modal.Header closeButton>
          <Modal.Title>
            응원글 보기
            {note.isFavorite ? (
              <BsSuitHeartFill color="#fff" onClick={onLikeClick} />
            ) : (
              <BsSuitHeart onClick={onLikeClick} />
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', padding: '0px' }}>
              <Row style={{ margin: '0px' }}>
                <div className={styles.group}>
                  <Col>
                    <Row>
                      <Col>
                        <label className={styles.form_label} htmlFor="nickname">
                          닉네임
                        </label>
                      </Col>
                      <Col>
                        <div>
                          <input
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
                      <Col>
                        <label className={styles.form_label} htmlFor="opendate">
                          공개 날짜
                        </label>
                      </Col>
                      <Col>
                        <div>
                          <input
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
          <div className={styles.cheer_box}>
            <div className={styles.cheerHeader}>
              <label className={styles.vertical_lr} htmlFor="cheer-text">
                서술형 응원
              </label>
              <div>
                <textarea
                  name="content"
                  placeholder="응원글을 작성해주세요."
                  id="cheer-text"
                  value={editMsg.content}
                  cols={30}
                  rows={10}
                  required
                  readOnly
                />
                <ul>
                  <li>
                    <button
                      className={styles.btn_hover_border_3}
                      type="button"
                      onClick={onDeleteClick}
                    >
                      삭제
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DetailMsg;
