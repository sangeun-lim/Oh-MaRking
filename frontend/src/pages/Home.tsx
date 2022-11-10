import styles from './Home.module.scss';
import Intro from '../components/home/Intro';

function Home(): JSX.Element {
  return (
    <div className={styles.screen_container}>
      <Intro />
    </div>
  );
}

export default Home;
