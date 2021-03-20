import React from 'react';
import classnames from 'classnames';
import style from './navbar.module.css';

const { wrapper, menuIcon, searchIcon } = style;

const menuIconClass = classnames(menuIcon, 'iconfont icon-gengduo');
const searchIconClass = classnames(searchIcon, 'iconfont icon-sousuo');

const Navbar: React.FC = () => {
  return (
    <div className={wrapper}>
      <i className={menuIconClass} />
      <div>app</div>
      <i className={searchIconClass} />
    </div>
  );
};

export default Navbar;
