import Carousel from 'react-bootstrap/Carousel';
import Notice from '../carousel/Notice';
import ExampleOmr from '../carousel/ExampleOmr';
import styles from './Intro.module.scss';

function Intro(): JSX.Element {
  return (
    <div className={styles.box_container}>
      <Carousel fade className={styles.board_carousel}>
        <Carousel.Item>
          <div className={styles.board_item}>
            <Notice />
          </div>
          {/* <img
            src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/character2.png?alt=media&token=d7f52c96-b8ee-42c1-9eb1-fa5fd74e5e4f"
            alt="마스코트"
            className={styles.character_img}
          /> */}
          <img
            src="src/img/졸라맨.png"
            alt="마스코트"
            className={styles.character_img}
          />
          {/* <img
            src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/character1.png?alt=media&token=e6eb279b-6fe1-441a-9a81-b065c24c9f4b"
            alt="로고"
            // className={styles.logo}
          /> */}
        </Carousel.Item>
        <Carousel.Item>
          <ExampleOmr />
        </Carousel.Item>
      </Carousel>
    </div>
    // <div className={styles.user_wrap}>
    //   <div className={styles.bg}>
    //     {/* <img src="src/img/bg5.png" alt="bg3" className={styles.bg_img} /> */}
    //   </div>
    //   <div className={styles.user_text}>
    //     <div className={styles.blackboard_title}>Oh! Marking</div>
    //     <div className={styles.blackboard_content}>
    //       <p>
    //         Oh! MaRking은 수험생들이 응원편지를 받을 수 있는 사이트입니다.{' '}
    //         <br />
    //         응원페이지에서 본인의 링크를 복사 후 SNS에 공유해보세요! <br />
    //         노녕과 아이들도 항상 수험생들을 응원하겠습니다! <br />
    //         <br />
    //         페이지를 옆으로 넘기면 예시 응원들을 보실 수 있습니다
    //       </p>
    //     </div>
    //   </div>
    //   {/* 마스코트 위치 칠판 오른쪽 아래로 가게해야되는데 막힘 */}
    //   <div className={styles.bg_character}>
    //
    //   </div>
    // </div>
  );
}

export default Intro;
