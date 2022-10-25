import styles from './Intro.module.scss';

function Intro(): JSX.Element {
  return (
    <div>
      <div className={styles.bg}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/bg3.png?alt=media&token=525131c1-8c57-44f1-b089-d031ec84f816"
          alt="bg3"
          className={styles.bg_img}
        />
      </div>
      {/* 마스코트 위치 칠판 오른쪽 아래로 가게해야되는데 막힘 */}
      <div className={styles.bg_character}>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/character2.png?alt=media&token=d7f52c96-b8ee-42c1-9eb1-fa5fd74e5e4f"
          alt="마스코트"
          className={styles.character_img}
        />
      </div>
    </div>
  );
}

export default Intro;
