import Carousel from 'react-bootstrap/Carousel';
import Notice from '../carousel/Notice';
import ExampleOmr from '../carousel/ExampleOmr';
import styles from './Intro.module.scss';

function Intro(): JSX.Element {
  return (
    <div className={styles.box_container}>
      <Carousel fade className={styles.board_carousel}>
        <Carousel.Item className={styles.carousel_center}>
          <Notice />
        </Carousel.Item>
        <Carousel.Item>
          <ExampleOmr />
        </Carousel.Item>
      </Carousel>
      <div>
        <div className={styles.pen}>{''}</div>
        <div className={styles.blue_pen}>{''}</div>
        <div className={styles.red_pen}>{''}</div>
        <div className={styles.eraser}>
          BOARD ERASER
          <div className={styles.eraser_bg}>청소당번</div>
        </div>
      </div>
      <div className={styles.hand_img}>
        <img src="src/img/HAND.png" alt="" />
      </div>
    </div>
  );
}

export default Intro;
