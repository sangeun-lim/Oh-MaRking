import { style } from '@mui/system';
import styles from './Notice.module.scss';

function Notice(): JSX.Element {
  return (
    <div>
      <div className={styles.blackboard_item}>
        <div className={styles.carousel_item}>
          <div className={styles.carousel_img}>
            <img
              className={styles.lg_window}
              src="src/img/title_1200x600.png"
              alt=""
            />
          </div>
          <br />
          <div className={styles.lg_window_content}>
            <div style={{ color: 'white' }}>
              수험생 응원 롤링페이퍼
              <br />
              <span style={{ color: 'rgb(248, 254, 99)' }}>응원페이지</span>를
              SNS에 <span style={{ color: 'rgb(0,176,240)' }}>공유</span>
              해보세요!
            </div>
          </div>
        </div>
        <div className={styles.cheerup_img}>
          <img src="src/img/Cheerup.png" alt="" />
        </div>
      </div>
      {/* 
      <div className={styles.carousel_item}>
        <img
          className={styles.xl_window}
          src="src/img/title_1800x800.png"
          alt=""
        />
      </div>
      <br />
      <div className={styles.xl_window_content}>
        <div style={{ color: 'white' }}>
          수험생 응원 롤링페이퍼
          <br />
          <span style={{ color: 'rgb(248, 254, 99)' }}>응원페이지</span>를 SNS에{' '}
          <span style={{ color: 'rgb(0,176,240)' }}>공유</span>해보세요!
        </div>
      </div> */}
    </div>
  );
}

export default Notice;
