import { useState } from 'react';
import Container from 'react-bootstrap/Container';
// import EventApi from 'api/EventApi';
// import { EventList } from 'utils/Interface';
// import { Toast } from '../common/Toast';
import EventCardComponent from '../components/event/EventCardComponent';
import styles from './EventPage.module.scss';

function EventPage(): JSX.Element {
  // const [eventList, setEventList] = useState<EventList[]>([]);

  // const callEvent = async () => {
  //   const response = await EventApi.event.readAll();
  //   if (response.status === 200) {
  //     setEventList(response.data);
  //   } else {
  // Toast('오류가 발생했습니다.', 'callEventFail');

  //   }
  // };

  // useEffect(() => {
  //   callEvent();
  // }, []);

  const imageUrl =
    'https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/KakaoTalk_20220827_015314341_24.jpg?alt=media&token=b4cd0204-20fb-4039-9648-9ee662d7b938';
  const imageAlt = '사진입니다';
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Container className={styles.background}>
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

// {
//    밑에는 api로 받아와서 나타나게 할 코드 제대로 동작하는지는 모르겠네??
//       <Container className={styles.background}>
//         <div className={styles.card_flex}>
//           <div>
//             {eventList.map((item, i) => {
//               return (
//                 <div>
//                   <EventCardComponent
//                     imageUrl={item.imgUrl}
//                     imageAlt={item.imgUrl}
//                     open={open}
//                     setOpen={setOpen}
//                     // link={item.link}
//                     // start={item.start_date}
//                     // end={item.end_date}
//                   />
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </Container>
// }
