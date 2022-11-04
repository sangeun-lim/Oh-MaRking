import styles from './ExampleOmr.module.scss';

function ExampleOmr(): JSX.Element {
  return (
    <div>
      <div>응원페이지 꾸미기?</div>
      <div>
        <p>응원페이지를 이쁘게 꾸며주세요</p>
      </div>
      {/* img */}
    </div>
    // <div className={styles.user_text}>
    //   <div className={styles.blackboard_title}>Oh! Marking</div>
    //   <div className={styles.blackboard_content}>
    //     <p>
    //       Oh! MaRking은 수험생들이 응원편지를 받을 수 있는 사이트입니다. <br />
    //       응원페이지에서 본인의 링크를 복사 후 SNS에 공유해보세요! <br />
    //       노녕과 아이들도 항상 수험생들을 응원하겠습니다! <br />
    //       <br />
    //       페이지를 옆으로 넘기면 예시 응원들을 보실 수 있습니다
    //     </p>
    //   </div>
    // </div>
  );
}

export default ExampleOmr;
