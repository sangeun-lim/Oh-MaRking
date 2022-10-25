import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.scss';

function NavBar(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div>
      <div className="navList">
        <div className="left">
          <NavLink to="/">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/character1.png?alt=media&token=e6eb279b-6fe1-441a-9a81-b065c24c9f4b"
              alt="로고"
              className="logo"
            />
          </NavLink>
        </div>
        <div className="right">
          <div>
            <NavLink className="nav_font" to="/event">
              이벤트 모음 바로가기
            </NavLink>
          </div>
          <div>
            {/* <a href=""> */}

            <img
              src="https://firebasestorage.googleapis.com/v0/b/stately-century-349715.appspot.com/o/kakao_login_large_narrow.png?alt=media&token=ee673d01-4ce5-4ec8-8a80-30de5a28f2e9"
              alt="카카오로그인"
              className="kakao_login"
            />
          </div>
          {/* </a> */}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
