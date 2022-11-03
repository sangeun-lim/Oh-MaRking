import { NavLink } from 'react-router-dom';
import Button from '../common/Button';
import TotalArticlePage from '../../pages/TotalArticlePage';
import styles from './Search.module.scss';

function Search(): JSX.Element {
  return (
    <button type="button">
      {/* // <Button text={'전체 응원글'} />; */}

      <NavLink to={`/article/:werwear`}>전체응원</NavLink>
    </button>
  );
}

export default Search;
