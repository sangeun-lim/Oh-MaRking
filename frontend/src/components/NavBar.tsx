import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styles from './NavBar.module.scss';

function NavBar(): JSX.Element {
  // 유저 유무 상태 변수 필요
  const navigate = useNavigate();

  // const logoutRequest = async () => {
  //   dispatch(userObjectActions.logout());
  //   sessionStorage.setItem("token", "");
  //   setCookie("refresh_token", "");
  //   navigate("/");
  // };

  // const Logout = () => {
  //   logoutRequest();
  // };

  return (
    <Navbar className={styles.navList} expand="xl">
      {/* <Container className={styles.box_container}> */}
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
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <Nav.Link className={styles.nav_font} href="/cheer/wfaw">
              내 응원가기
            </Nav.Link>
            <Nav.Link className={styles.nav_font} href="/event">
              이벤트 보러가기
            </Nav.Link>
            <Nav.Link href="/event">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/kakao_login_medium_narrow.png?alt=media&token=83a37f58-dce3-4758-bfcf-1ddd7699349f"
                alt="카카오로그인"
                // className={styles.kakao_login}
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
      {/* </Container> */}
    </Navbar>
    // <div>
    //   <div className={styles.navList}>
    //     <div className={styles.left}>
    //       <NavLink to="/">
    //         <img
    //           src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/character1.png?alt=media&token=e6eb279b-6fe1-441a-9a81-b065c24c9f4b"
    //           alt="로고"
    //           className={styles.logo}
    //         />
    //       </NavLink>
    //     </div>
    //     <div className={styles.right}>
    //       {/* 유저로그인했을때 조건 주기 */}
    //       <div>
    //         <NavLink className={styles.nav_font} to="/cheer/wfaw">
    //           내 응원가기
    //         </NavLink>
    //       </div>
    //       <div>
    //         <NavLink className={styles.nav_font} to="/event">
    //           이벤트 보러가기
    //         </NavLink>
    //       </div>
    //       <div>
    //         {/* 로그인이냐 비로그인상태인가에 따라 조건주기 */}
    //         {/* <a href=""> */}
    //         <img
    //           src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/kakao_login_medium_narrow.png?alt=media&token=83a37f58-dce3-4758-bfcf-1ddd7699349f"
    //           alt="카카오로그인"
    //           // className={styles.kakao_login}
    //         />
    //       </div>
    //       <div>
    //         <button type="button">
    //           <FaSignOutAlt size="30" />
    //         </button>
    //       </div>
    //       {/* </a> */}
    //     </div>
    //   </div>
    // </div>
  );
}

export default NavBar;
