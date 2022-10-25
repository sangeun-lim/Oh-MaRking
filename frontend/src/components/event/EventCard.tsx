import styles from './EventCard.module.scss';

// 칠판 배경 넣어야되고
// 페이지네이션 해야되고
// 배치 얘기해야되고
// 사진 누르면 크게 보이게 하고 링크 이동 하게하고

function EventCard(): JSX.Element {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.card}>
          <img
            className={styles.card_img}
            src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/KakaoTalk_20220827_015314341_24.jpg?alt=media&token=b4cd0204-20fb-4039-9648-9ee662d7b938"
            alt="테스트1"
          />
        </div>
        <div className={styles.card}>
          <img
            className={styles.card_img}
            src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/KakaoTalk_20220827_015601503_08.jpg?alt=media&token=50f83e99-6647-45cd-875f-28936915808a"
            alt="테스트1"
          />
        </div>
        <div className={styles.card}>
          <img
            className={styles.card_img}
            src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/KakaoTalk_20220827_015601503_13.jpg?alt=media&token=3a184f7b-6729-422f-9d9d-59f7e977f8f0"
            alt="테스트1"
          />
        </div>
        <div className={styles.card}>
          <img
            className={styles.card_img}
            src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/KakaoTalk_20220827_015314341_20.jpg?alt=media&token=86d79d15-4a1c-43d0-825e-d652cee582a1"
            alt="테스트1"
          />
        </div>
        <div className={styles.card}>
          <img
            className={styles.card_img}
            src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/KakaoTalk_20220827_015314341_18.jpg?alt=media&token=e9875ef9-6ef3-429a-ae25-2847bb59a6e2"
            alt="테스트1"
          />
        </div>
      </div>
    </div>
  );
}

export default EventCard;
