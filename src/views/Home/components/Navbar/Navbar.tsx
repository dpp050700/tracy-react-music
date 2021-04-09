import React from 'react';
import classnames from 'classnames';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';
import style from './navbar.module.css';

const { wrapper, menuIcon, searchIcon } = style;

const menuIconClass = classnames(menuIcon, ' music-icon-more');
const searchIconClass = classnames(searchIcon, ' music-icon-search');

interface INavBar extends RouteComponentProps<any> {
  leftClick: () => void;
}

const Navbar: React.FC<INavBar> = (props: INavBar) => {
  const { leftClick } = props;
  return (
    <div className={wrapper}>
      <i
        className={menuIconClass}
        role="button"
        tabIndex={0}
        aria-label="more"
        onClick={leftClick}
        onKeyDown={leftClick}
      />
      <div>app</div>
      <i
        role="button"
        className={searchIconClass}
        tabIndex={0}
        aria-label="search"
        onKeyDown={() => props.history.push('/search')}
        onClick={() => props.history.push('/search')}
      />
    </div>
  );
};

export default withRouter(Navbar);
