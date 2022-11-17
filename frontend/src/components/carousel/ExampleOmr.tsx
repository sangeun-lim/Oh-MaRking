import styles from './ExampleOmr.module.scss';

function ExampleOmr(): JSX.Element {
  return (
    <div>
      <div className={styles.example_omr}>
        <img src="src/img/omr_1.gif" alt="" width="1000px" />
        <div className={styles.example_content}>
          나만의 <span style={{ color: 'rgb(248, 254, 99)' }}>OMR </span>
          <span style={{ color: 'rgb(0,176,240)' }}>응원페이지</span>를
          꾸며보세요!
        </div>
      </div>
      <div className={styles.cheerup_img}>
        <img src="src/img/cheer_character.png" alt="" width="300px" />
      </div>
    </div>
  );
}

export default ExampleOmr;
