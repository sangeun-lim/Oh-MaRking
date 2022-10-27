import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
import styles from './EventCard.module.scss';
import './Card.scss';
// 칠판 배경 넣어야되고
// 페이지네이션 해야되고
// 배치 얘기해야되고
// 사진 누르면 크게 보이게 하고 링크 이동 하게하고

// 이미지를 클릭하면 모달로 이미지 크게 띄워주고 이동링크 밑에 넣어주고
// 상태는 모달을 누른 상태인지 아닌지 useState로 toggle값 변경

function EventCard(): JSX.Element {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const imageClick = () => {
    setOpen(!open);
  };

  const modalClick = () => {
    console.log('hi');
    navigate('/');
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <button type="button" onClick={imageClick}>
            <img
              className={styles.card_img}
              src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/KakaoTalk_20220827_015314341_24.jpg?alt=media&token=b4cd0204-20fb-4039-9648-9ee662d7b938"
              alt="테스트1"
            />
          </button>
        </div>
      </div>
      <Modal show={open} onHide={imageClick}>
        {/* <Modal.Header closeButton>
          <Modal.Title>이벤트 페이지</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>
          <button type="button" onClick={modalClick}>
            <img
              className={styles.modalimg}
              src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/KakaoTalk_20220827_015314341_24.jpg?alt=media&token=b4cd0204-20fb-4039-9648-9ee662d7b938"
              alt="임상은 ㅋㅋ"
            />
          </button>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EventCard;
