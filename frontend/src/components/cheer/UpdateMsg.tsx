import React, { Dispatch, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setIsOwner, setOmr } from '../../store/omr';
import { setUser } from '../../store/user';
import { EditNoteData, EditNote } from '../../utils/Interface';
import OMRApi from '../../api/OMRApi';
import { RootState } from '../../store/store';
import styles from './CreateMsg.module.scss';
import '../../style/style.scss';

interface Props {
  pass: boolean;
  setPass: Dispatch<React.SetStateAction<boolean>>;
  setShow: Dispatch<React.SetStateAction<boolean>>;
  formData: EditNoteData;
  noteId: number;
}

function UpdateMsg({
  pass,
  setPass,
  formData,
  noteId,
  setShow,
}: Props): JSX.Element {
  const dispatch = useDispatch();

  const { omr, user, auth } = useSelector((state: RootState) => state);
  const { codedEmail } = user;

  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editMsg, setEditMsg] = useState<EditNote>({
    nickname: formData.nickname,
    content: formData.content,
    showDate: formData.showDate,
  });

  const onChange = (e: any) => {
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
  const onSubmit = async (e: any) => {
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
    setPass(false);
    setShow(false);
    alert('응원메시지가 수정되었습니다.');
    onEditClick();
  };

  const handleClose = () => setPass(false);

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
        setPass(false);
        setShow(false);
        alert('응원 메시지가 삭제되었습니다.');
      } catch (err) {
        console.log(err);
        alert('응원메시지를 삭제할 수 없습니다.');
      }
    }
    onEditClick();
  };

  return (
    <div>
      <Modal show={pass} onHide={handleClose} className={styles.test}>
        <Modal.Header closeButton>
          <Modal.Title>응원글 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={onSubmit}>
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
                            <input
                              id="opendate"
                              name="showDate"
                              type="date"
                              value={editMsg.showDate}
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
                    onChange={onChange}
                    value={editMsg.content}
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
