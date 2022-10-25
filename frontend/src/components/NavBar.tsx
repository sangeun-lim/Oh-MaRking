import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.scss';

function NavBar(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div>
        <NavLink to="/">
          {/* <img src="src/img/character1.png" alt="로고" className="logo" /> */}
        </NavLink>
      </div>
      <div>
        <NavLink to="/event">이벤트 모음 바로가기</NavLink>
      </div>
      <div>소셜로그인 버튼</div>
    </div>
  );
}

export default NavBar;
