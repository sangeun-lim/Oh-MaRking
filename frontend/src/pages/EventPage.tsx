import react, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import styles from './EventPage.module.scss';
import EventCardComponent from '../components/event/EventCardComponent';

function EventPage(): JSX.Element {
  const imageUrl =
    'https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/KakaoTalk_20220827_015314341_24.jpg?alt=media&token=b4cd0204-20fb-4039-9648-9ee662d7b938';
  const imageAlt = '사진입니다';
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Container className={styles.background}>
        {/* <div className={styles.container}> */}
        <div className={styles.card_flex}>
          <EventCardComponent
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            open={open}
            setOpen={setOpen}
          />
          <EventCardComponent
            imageUrl={imageUrl}
            imageAlt={imageAlt}
            open={open}
            setOpen={setOpen}
          />
        </div>
      </Container>
    </div>
  );
}

export default EventPage;
