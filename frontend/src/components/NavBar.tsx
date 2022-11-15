import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaSignOutAlt } from 'react-icons/fa';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from '../store/auth';
import { setIsLoading } from '../store/omr';
import AuthApi from '../api/AuthApi';
import { RootState } from '../store/store';
import styles from './NavBar.module.scss';

function NavBar(): JSX.Element {
  const dispatch = useDispatch();

  const { myCodedEmail, isLoggedIn } = useSelector(
    (state: RootState) => state.auth
  );

  const logoutRequest = async () => {
    await AuthApi.auth.logout();
    dispatch(logout());
    dispatch(setIsLoading(true));
  };

  return (
    <Navbar
      sticky="top"
      className={styles.navList}
      style={{ padding: '0px' }}
      expand="xxl"
    >
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
            <Nav.Link
              className={`${styles.nav_font} ${styles.custom_cursor}`}
              href="/event"
            >
              설문조사
            </Nav.Link>
            {isLoggedIn && (
              <Nav.Link
                className={`${styles.nav_font} ${styles.custom_cursor}`}
                href={`/cheer/${myCodedEmail}`}
              >
                내 응원가기
              </Nav.Link>
            )}
            {/* <Nav.Link className={`${styles.nav_font} ${styles.custom_cursor}`} href="/event">
              이벤트 보러가기
            </Nav.Link> */}
            {!isLoggedIn ? (
              <Nav.Link
                className={`${styles.nav_font} ${styles.custom_cursor}`}
                href="http://oh-marking.com:8082/oauth2/authorization/kakao"
              >
                카카오 로그인
              </Nav.Link>
            ) : (
              <div className={styles.nav_font}>
                <button type="button" onClick={logoutRequest}>
                  로그아웃
                </button>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default NavBar;
