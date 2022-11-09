import { style } from '@mui/system';
import styles from './Notice.module.scss';

function Notice(): JSX.Element {
  return (
    <div className={styles.user_text}>
      <div className={styles.blackboard_title}>
        <span style={{ color: 'rgb(255,153, 204)' }}>O</span>
        <span className={styles.title_white}>H! </span>
        <span style={{ color: 'rgb(255,153, 204)' }}>M</span>
        <span>A</span>
        <span style={{ color: 'rgb(255,153, 204)' }}>R</span>
        <span>KING</span>
      </div>
      <div className={styles.blackboard_content}>
        <p>
          응원페이지를 SNS에 공유해보세요! <br />
          여러분들의 지인에게 응원메세지를 받아보실 수 있습니다. <br />
          노녕과 아이들은 항상 수험생들을 응원합니다! <br />
          {/* <br />
          페이지를 옆으로 넘기면 예시 응원들을 보실 수 있습니다 */}
        </p>
      </div>
    </div>
  );
}

export default Notice;
