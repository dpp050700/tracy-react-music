/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import styled from './Search.module.css';
import SearchBox from './components/SearchBox/SearchBox';
import HistorySearch from './components/HistorySearch/HistorySearch';
import HotSearch from './components/HotSearch/HotSearch';
import SuggestList from './components/SuggestList/SuggestList';

const { root, content, searchTagContent } = styled;

interface ISuggestList {
  keywords: string;
  showSuggest: boolean;
}

const Search: React.FC<ISuggestList> = (props: ISuggestList) => {
  const { keywords, showSuggest } = props;
  return (
    <div className={root}>
      <SearchBox />
      <div className={content}>
        {showSuggest && keywords ? (
          <SuggestList />
        ) : keywords ? (
          <div>搜索结果</div>
        ) : (
          <div className={searchTagContent}>
            <HistorySearch />
            <HotSearch />
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  keywords: state.getIn(['search', 'keywords']) || '',
  showSuggest: state.getIn(['search', 'showSuggest']) || false,
});

export default connect(mapStateToProps)(Search);
