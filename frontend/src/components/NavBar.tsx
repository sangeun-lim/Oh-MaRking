import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSignOutAlt } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from '../store/auth';
import AuthApi from '../api/AuthApi';
import { RootState } from '../store/store';
import styles from './NavBar.module.scss';

function NavBar(): JSX.Element {
  const dispatch = useDispatch();

  const { auth, user } = useSelector((state: RootState) => state);
  const url = `/cheer/${user.codedEmail}`;

  const logoutRequest = async () => {
    await AuthApi.auth.logout();
    dispatch(logout());
  };

  return (
    <Navbar className={styles.navList} style={{ padding: '0px' }} expand="xxl">
      {/* <Container className={styles.box_container}> */}
      {auth.isLoggedIn ? (
        <div className={styles.box_container}>
          <Navbar.Brand className={styles.left} href="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/character1.png?alt=media&token=e6eb279b-6fe1-441a-9a81-b065c24c9f4b"
              alt="로고"
              className={styles.logo}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end align-items-center flex-grow-1 pe-3">
              <Nav.Link className={styles.nav_font} href="/event">
                설문조사
              </Nav.Link>
              {/* <Nav.Link className={styles.nav_font} href="/cheer/wfaw"> */}
              <Nav.Link
                className={styles.nav_font}
                href={`/cheer/${user.codedEmail}`}
              >
                내 응원가기
              </Nav.Link>
              <Nav.Link className={styles.nav_font} href="/event">
                이벤트 보러가기
              </Nav.Link>
              <div>
                <button type="button" onClick={logoutRequest}>
                  <FaSignOutAlt size="30" />
                </button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </div>
      ) : (
        <div className={styles.box_container}>
          <Navbar.Brand className={styles.left} href="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/character1.png?alt=media&token=e6eb279b-6fe1-441a-9a81-b065c24c9f4b"
              alt="로고"
              className={styles.logo}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="justify-content-end align-items-center flex-grow-1 pe-3">
              <Nav.Link className={styles.nav_font} href="/event">
                설문조사
              </Nav.Link>
              <Nav.Link className={styles.nav_font} href="/event">
                이벤트 보러가기
              </Nav.Link>
              <Nav.Link href="http://oh-marking.com:8081/oauth2/authorization/kakao">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/kakao_login_medium_narrow.png?alt=media&token=83a37f58-dce3-4758-bfcf-1ddd7699349f"
                  alt="카카오로그인"
                  // className={styles.kakao_login}
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      )}

      {/* </Container> */}
    </Navbar>
  );
}

export default NavBar;
