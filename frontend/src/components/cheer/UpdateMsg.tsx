import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Toast } from '../common/Toast';
import { setIsOwner, setOmr } from '../../store/omr';
import { setShow } from '../../store/modal';
import { setUser, setOmrList } from '../../store/user';
import { EditNoteData, EditNote } from '../../utils/Interface';
import OMRApi from '../../api/OMRApi';
import {
  getKey,
  getLikeItem,
  isDeletedPage,
  COLOR_LIST,
} from '../../utils/utils';
import { RootState } from '../../store/store';
import { addLikeList, removeLikeItem } from '../../store/likeList';
import styles from './UpdateMsg.module.scss';
import '../../style/style.scss';

interface Props {
  formData: EditNoteData;
  noteId: number;
}

function UpdateMsg({ formData, noteId }: Props): JSX.Element {
  const dispatch = useDispatch();

  const { omr, user, auth, modal, note } = useSelector(
    (state: RootState) => state
  );
  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editMsg, setEditMsg] = useState<EditNote>({
    nickname: formData.nickname,
    content: formData.content,
    showDate: formData.showDate,
  });
  const cheerTag = [
    '너의 꿈을 응원해!',
    '넌 할 수 있어!',
    '힘내!',
    '응원할게!',
    '항상!',
    '파이팅!',
    '수고했어!',
    '고생했어!',
    '넌 최고야!',
    '끝나고 🍻 한 잔?',
    '❤',
    '👍',
    '👊',
    '🎈',
  ];
  const handleTag = (data: string) => {
    setEditMsg((prev) => {
      return {
        ...prev,
        content: prev.content + data,
      };
    });
  };
  useEffect(() => {
    setEditMsg(formData);
  }, [formData]);

  const onChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setEditMsg((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const onEditClick = () => {
    setOnEdit(!onEdit);
  };
  // 수정버튼눌렀을때 동작
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const changeFormData = {
      content: editMsg.content,
      showDate: editMsg.showDate,
    };

    await OMRApi.note.updateNote(noteId, changeFormData);
    const { data } = await OMRApi.omr.getOmr(
      user.omrList[omr.pageNum],
      auth.isLoggedIn
    );
    dispatch(setUser(data.data.user));
    dispatch(setOmr(data.data.omr));
    dispatch(setIsOwner(data.data.isOwner));
    dispatch(setShow());
    Toast('수정이 완료되었습니다.', 'updateSuccess');
    onEditClick();
  };

  const handleClose = () => {
    dispatch(setShow());
  };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm(
      '작성된 응원메시지를 삭제하시겠습니까?'
    );
    if (del) {
      try {
        let omrId = user.omrList[omr.pageNum];
        const response = await OMRApi.note.deleteNote(noteId);
        if (isDeletedPage(user.omrList, response.data.data.omrList)) {
          [omrId] = response.data.data.omrList;
          dispatch(setOmrList(response.data.data.omrList));
        }
        const { data } = await OMRApi.omr.getOmr(omrId, auth.isLoggedIn);
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
        Toast('응원이 삭제되었습니다.', 'deleteNoteSuccess');
      } catch (err) {
        console.log(err);
        Toast('응원 삭제에 실패했습니다.', 'deleteNoteFail');
      }
    }
    onEditClick();
  };

  return (
    <div>
      <Modal
        show={modal.show}
        onHide={handleClose}
        className={`${styles[COLOR_LIST[omr.color]]} ${styles.test}`}
      >
        <Modal.Header
          style={{ backgroundColor: 'rgb(253 253 229)', border: '0px' }}
          closeButton
        >
          <Modal.Title>응원글 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: 'rgb(253 253 229)' }}>
          <form onSubmit={onSubmit}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', padding: '0px' }}>
                <Row style={{ margin: '0px' }}>
                  <div className={styles.group}>
                    <Col>
                      <Row>
                        <Col
                          className={`${styles.first_header} ${styles.bottom_header}`}
                        >
                          <label
                            className={styles.form_label}
                            htmlFor="nickname"
                          >
                            이름
                          </label>
                        </Col>
                        <Col
                          className={`${styles.header} ${styles.bottom_header}`}
                        >
                          <div>
                            <input
                              style={{ backgroundColor: 'rgb(250, 250, 242)' }}
                              name="nickname"
                              id="nickname"
                              type="text"
                              placeholder="이름을 입력해주세요."
                              value={formData.nickname}
                              maxLength={10}
                              disabled
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
                            htmlFor="opendate"
                          >
                            공개 날짜
                          </label>
                        </Col>
                        <Col
                          className={`${styles.header} ${styles.bottom_header}`}
                        >
                          <div>
                            <input
                              style={{ backgroundColor: 'rgb(250, 250, 242)' }}
                              id="opendate"
                              name="showDate"
                              type="date"
                              value={editMsg.showDate || formData.showDate}
                              onChange={onChange}
                              required
                            />
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </div>
                </Row>
              </div>
            </div>
            <div>
              {cheerTag.map((data) => (
                <button
                  className={styles.btn_hover_border_3}
                  onClick={() => handleTag(data)}
                  style={{
                    fontSize: '20px',
                    border: '1px solid white',
                    borderRadius: '20px',
                  }}
                  type="button"
                  key={getKey()}
                >
                  #{data}
                </button>
              ))}
            </div>
            <div>
              <div className={`${styles.cheerHeader}`}>
                <label
                  className={`${styles.vertical_lr} ${styles.first_header}`}
                  htmlFor="cheer-text"
                >
                  서술형 응원
                </label>
                <div
                  className={styles.body}
                  style={{ backgroundColor: 'rgb(250, 250, 242)' }}
                >
                  <textarea
                    name="content"
                    id="cheer-text"
                    style={{ backgroundColor: 'rgb(250, 250, 242)' }}
                    onChange={onChange}
                    // placeholder={formData.content}
                    value={editMsg.content || formData.content}
                    cols={30}
                    rows={10}
                    required
                  />
                  <ul>
                    <li>
                      <button
                        className={styles.btn_hover_border_3}
                        type="submit"
                        onClick={onEditClick}
                      >
                        수정하기
                      </button>
                    </li>
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
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default UpdateMsg;
