import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import styles from './NavBar.module.scss';

function NavTest() {
  return (
    <Navbar collapseOnSelect expand="lg">
      <Container>
        <Navbar.Brand>
          <NavLink to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/character1.png?alt=media&token=e6eb279b-6fe1-441a-9a81-b065c24c9f4b"
              alt="로고"
              className={styles.logo}
            />
          </NavLink>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav>
            <NavLink className={styles.nav_font} to="/cheer/wfaw">
              내 응원가기
            </NavLink>
            <NavLink className={styles.nav_font} to="/event">
              이벤트 보러가기
            </NavLink>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/kakao_login_medium_narrow.png?alt=media&token=83a37f58-dce3-4758-bfcf-1ddd7699349f"
              alt="카카오로그인"
              className={styles.kakao_login}
            />
            <button type="button">
              <FaSignOutAlt size="30" />
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavTest;
