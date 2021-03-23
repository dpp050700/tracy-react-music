/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import classnames from 'classnames';
import style from './navbar.module.css';

const { wrapper, menuIcon, searchIcon } = style;

const menuIconClass = classnames(menuIcon, 'iconfont icon-gengduo');
const searchIconClass = classnames(searchIcon, 'iconfont icon-sousuo');

interface INavBar {
  leftClick: () => void;
}

const Navbar: React.FC<INavBar> = (props: INavBar) => {
  const { leftClick } = props;
  return (
    <div className={wrapper}>
      <i className={menuIconClass} onClick={leftClick} />
      <div>app</div>
      <i className={searchIconClass} />
    </div>
  );
};

export default Navbar;
