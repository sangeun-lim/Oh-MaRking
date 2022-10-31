// import React, { useEffect } from 'react';
// import { debounce } from 'lodash';
import styles from './App.module.scss';
import Router from './Router';

function App(): JSX.Element {
  // useEffect(() => {
  //   const handleResize = debounce(() => {
  //     window.scrollTo(0, 0);
  //   });
  //   window.addEventListener('resize', handleResize);
  // }, []);

  return (
    <div className={styles.image}>
      <Router />
    </div>
  );
}

export default App;
