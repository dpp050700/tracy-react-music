import React from 'react';
import styled from './Search.module.css';
import SearchBox from './components/SearchBox/SearchBox';
import HistorySearch from './components/HistorySearch/HistorySearch';
import HotSearch from './components/HotSearch/HotSearch';

const { root, content } = styled;

const Search: React.FC = () => {
  return (
    <div className={root}>
      <SearchBox />
      <div className={content}>
        <HistorySearch />
        <HotSearch />
      </div>
    </div>
  );
};

export default Search;
