// import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import styles from './CheerPage.module.scss';
import OMR from '../components/cheer/OMR';

function CheerPage(): JSX.Element {
  return (
    <Container className={styles.screen_container}>
      <OMR />
    </Container>
    // <div className={styles.container}>
    //   <OMR />
    // </div>
  );
}

export default CheerPage;
