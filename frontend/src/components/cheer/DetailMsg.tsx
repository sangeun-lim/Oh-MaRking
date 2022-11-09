import React, { Dispatch, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Swal from 'sweetalert2';
import { setIsOwner, setOmr, setNoteOpen, setNoteLike } from '../../store/omr';
import { setNote, setFavorite } from '../../store/note';
import { setUser } from '../../store/user';
import { EditNote } from '../../utils/Interface';
import { EditDefaultNote } from '../../utils/DefaultData';
import OMRApi from '../../api/OMRApi';
import { RootState } from '../../store/store';
import { heartUrl } from '../../utils/imgUrl';
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
    const result = await swalWithBootstrapButtons.fire({
      // title: '작성된 응원메시지를 삭제하시겠습니까?',
      text: '작성된 응원메시지를 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '삭제할게요',
      cancelButtonText: '뒤로갈게요',
      reverseButtons: true,
    });
    // result.is
    // .then((result) => {
    if (result.isConfirmed) {
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

      swalWithBootstrapButtons.fire(
        '삭제완료!',
        '응원메시지가 삭제되었습니다.',
        'success'
      );
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        '삭제 취소',
        '응원페이지로 돌아갑니다 :)',
        'error'
      );
    }
    onEditClick();
  };
  // const del: boolean = window.confirm(
  //   '작성된 응원메시지를 삭제하시겠습니까?'
  // );
  // if (del) {
  //   try {
  //     await OMRApi.note.deleteNote(noteId);
  //     const { data } = await OMRApi.omr.getOmr(
  //       user.omrList[omr.pageNum],
  //       auth.isLoggedIn
  //     );
  //     dispatch(setUser(data.data.user));
  //     dispatch(setOmr(data.data.omr));
  //     dispatch(setIsOwner(data.data.isOwner));
  //     setPass(false);
  //     setShow(false);
  //     // alert('응원 메시지가 삭제되었습니다.');
  //     Swal.fire({
  //       icon: 'error',
  //       title: '응원 메시지가 삭제되었습니다.',
  //     });
  //     // dispatch로 새로운 omrList를 갱신해주는 코드가 필요할듯?
  //   } catch (err) {
  //     console.log(err);
  //     alert('응원메시지를 삭제할 수 없습니다.');
  //   }
  // }

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
      <Modal
        show={pass}
        onHide={handleClose}
        className={`${styles[colorList[omr.color]]} ${styles.test}`}
      >
        <Modal.Header
          style={{ backgroundColor: '#FBFFFE', border: '0px' }}
          closeButton
        >
          <div className={styles.modaltitle}>
            <Modal.Title>응원글 보기</Modal.Title>
            {note.isFavorite ? (
              // <BsSuitHeartFill
              //   className={styles.likeButton}
              //   onClick={onLikeClick}
              // />
              <div style={{ width: '1em', height: '1em' }}>
                <button
                  style={{ width: '100%', height: '100%' }}
                  type="button"
                  onClick={onLikeClick}
                >
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={heartUrl}
                    alt=""
                  />
                </button>
              </div>
            ) : (
              <BsSuitHeart onClick={onLikeClick} />
            )}
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
                        <label className={styles.form_label} htmlFor="nickname">
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
                        <label className={styles.form_label} htmlFor="opendate">
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
                  id="cheer-text"
                  value={editMsg.content}
                  style={{ backgroundColor: '#FBFFFE' }}
                  cols={30}
                  rows={5}
                  required
                  readOnly
                />
                <ul style={{ margin: '0px' }}>
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
