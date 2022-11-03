import React, { Dispatch, useState } from 'react';
import { NoteDetail, EditNote } from 'utils/Interface';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OMRApi from '../../api/OMRApi';
import styles from './CreateMsg.module.scss';
import '../../style/style.scss';

interface Props {
  pass: boolean;
  setPass: Dispatch<React.SetStateAction<boolean>>;
  formData: NoteDetail;
}

function DetailMsg({ pass, setPass, formData }: Props): JSX.Element {
  // props로 noteId값 얻어야하는데
  const noteId = '';

  const [onEdit, setOnEdit] = useState<boolean>(false);
  const [editMsg, setEditMsg] = useState<EditNote>({
    nickname: formData.nickname,
    content: formData.content,
    show_date: formData.show_date,
    date: formData.date,
    problem_num: formData.problem_num,
    check_num: formData.check_num,
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

  const onSubmit = async (e: any) => {
    e.preventDefault();

    const changeFormData = {
      nickname: editMsg.nickname,
      content: editMsg.content,
      show_date: editMsg.show_date,
      date: editMsg.date,
    };

    const response = await OMRApi.note.updateNote(noteId, changeFormData);

    // api명세서보면 내 생각으론 변화된 값을 그대로 전달해줘야되는데,
    // 그냥 수정됨만 보내주는디.. 흠
    // if (response.status === 200) {

    // }
  };

  const onEditClick = () => {
    setOnEdit(!onEdit);
  };

  const onDeleteClick = async () => {
    const del: boolean = window.confirm(
      '작성된 응원메시지를 삭제하시겠습니까?'
    );
    if (del) {
      try {
        const response = await OMRApi.note.deleteNote(noteId);

        // if (response.status === 200) {

        // } else {
        //   alert("응원메시지를 삭제할 수 없습니다.")
        // }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div>
      <Modal show={show} onHide={handleClose} className={styles.test}>
        <Modal.Header closeButton>
          <Modal.Title>응원글 수정</Modal.Title>
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
                              id="nickname"
                              type="text"
                              placeholder="닉네임을 입력해주세요."
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
                              id="password"
                              type="password"
                              placeholder="비밀번호를 입력해주세요."
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
                              id="password-check"
                              type="password"
                              placeholder="동일한 비밀번호를 입력하세요."
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
                    placeholder="응원글을 작성해주세요."
                    name="cheer-text"
                    id="cheer-text"
                    cols={30}
                    rows={10}
                  />
                  <ul>
                    <li>
                      <button type="button" onClick={handleClose}>
                        취소
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

export default DetailMsg;
