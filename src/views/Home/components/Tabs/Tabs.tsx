import React from 'react';
import classnames from 'classnames';
import { NavLink } from 'react-router-dom';
import style from './tabs.module.css';

const { wrapper, tabsItem, tabsItemSselected } = style;

const tabs = [
  {
    name: '推荐',
    id: 1,
    path: '/recommend',
  },
  {
    name: '歌手',
    id: 2,
    path: '/singer',
  },
  {
    name: '排行榜',
    id: 3,
    path: '/rank',
  },
];

const Navbar: React.FC = () => {
  const tabItemClass = classnames(tabsItem, tabsItemSselected);
  return (
    <div className={wrapper}>
      {tabs.map(item => {
        return (
          <NavLink to={item.path} className={tabItemClass} key={item.id} activeClassName="selected">
            <span>{item.name}</span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Navbar;
