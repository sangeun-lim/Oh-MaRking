import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import styles from './EventModal.module.scss';
// import './Card.scss';
// 칠판 배경 넣어야되고
// 페이지네이션 해야되고
// 배치 얘기해야되고
// 사진 누르면 크게 보이게 하고 링크 이동 하게하고

// 이미지를 클릭하면 모달로 이미지 크게 띄워주고 이동링크 밑에 넣어주고
// 상태는 모달을 누른 상태인지 아닌지 useState로 toggle값 변경
interface EventModalProps {
  imageUrl: string;
  imageAlt: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function EventModal({
  imageUrl,
  imageAlt,
  open,
  setOpen,
}: EventModalProps): JSX.Element {
  const imageClick = () => {
    setOpen(!open);
  };
  return (
    <Modal show={open} onHide={imageClick}>
      {/* <Modal.Header closeButton>
          <Modal.Title>이벤트 페이지</Modal.Title>
        </Modal.Header> */}
      <Modal.Body>
        <button type="button">
          <img className={styles.modalimg} src={imageUrl} alt={imageAlt} />
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default EventModal;
