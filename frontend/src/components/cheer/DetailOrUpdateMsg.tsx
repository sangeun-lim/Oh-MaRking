import React, { Dispatch, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NoteDetail, EditNote } from '../../utils/Interface';
import OMRApi from '../../api/OMRApi';
import styles from './CreateMsg.module.scss';
import '../../style/style.scss';

interface Props {
  pass: boolean;
  setPass: Dispatch<React.SetStateAction<boolean>>;
  formData: NoteDetail;
}

// props로 noteId값 얻고
// user 응원페이지의 url도 얻어야됨
// 응원페이지에 주인 토큰을 가지고 있으면 삭제버튼만 보이게
// 아니라면 수정 삭제버튼보이게
function DetailOrUpdateMsg({ pass, setPass, formData }: Props): JSX.Element {
  const navigate = useNavigate();

  const noteId = '';

  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editMsg, setEditMsg] = useState<EditNote>({
    nickname: formData.nickname,
    content: formData.content,
    show_date: formData.show_date,
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
      nickname: editMsg.nickname,
      content: editMsg.content,
      show_date: editMsg.show_date,
    };

    const response = await OMRApi.note.updateNote(noteId, changeFormData);

    if (response.status === 200) {
      alert('응원메시지가 수정되었습니다.');
      navigate(`/cheer/user`);
    }

    onEditClick();
  };

  const handleClose = () => setPass(false);

  const onDeleteClick = async () => {
    const del: boolean = window.confirm(
      '작성된 응원메시지를 삭제하시겠습니까?'
    );
    if (del) {
      try {
        const response = await OMRApi.note.deleteNote(noteId);

        if (response.status === 200) {
          navigate(`/cheer/user`);
        } else {
          alert('응원메시지를 삭제할 수 없습니다.');
        }
      } catch (err) {
        console.log(err);
      }
    }
    onEditClick();
  };

  const onLikeClick = async (e: any) => {
    e.preventDefault();

    // const response = await OMRApi.note.likeNote(noteId, favorite);
  };

  return (
    <div>
      {/*  본인의 페이지인가 아닌가에 따라 조건처리를 해줘야함 */}
      {/*  내 토큰과 페이지의 어떤값과 비교를 할 수가 있나? userid 값으로 비교가 가능한가? */}
      <Modal pass={pass} onHide={handleClose} className={styles.test}>
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
                              onChange={onChange}
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
                              name="date"
                              type="date"
                              id="opendate"
                              value={formData.show_date}
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
                        type="button"
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

export default DetailOrUpdateMsg;
