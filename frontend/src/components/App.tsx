import styles from './App.module.scss';
import Router from './Router';

function App(): JSX.Element {
  return (
    <div className={styles.image}>
      <Router />
    </div>
  );
}

export default App;
