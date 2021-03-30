import React from 'react';
import styled from './SearchBox.module.css';

const { root, searchInputWrap, searchCancel, searchIcon, searchClear } = styled;

const SearchBox: React.FC = () => {
  return (
    <div className={root}>
      <div className={searchInputWrap}>
        <div className={searchIcon}>
          <i className="iconfont icon-sousuo" />
        </div>
        <input type="text" />
        <div className={searchClear}>
          <i className="iconfont icon-shibai" />
        </div>
      </div>
      <span className={searchCancel}>取消</span>
    </div>
  );
};

export default SearchBox;
