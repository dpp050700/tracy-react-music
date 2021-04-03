/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import styled from './Search.module.css';
import SearchBox from './components/SearchBox/SearchBox';
import SuggestList from './components/SuggestList/SuggestList';
import Scroll from '../../components/Scroll/Scroll';
import SearchResult from './components/SearchResult/SearchResult';
import * as action from './store/actions';
import SerachList, { ISearchItem } from './components/SerachList/SerachList';

const { root, content, searchTagContent } = styled;

interface ISuggestList {
  keywords: string;
  showSuggest: boolean;
  historyList: ISearchItem[];
  hotList: ISearchItem[];
  getHistoryListDispatch: () => void;
  clearHistoryList: () => void;
  getHotListDispatch: () => void;
}

const Search: React.FC<ISuggestList> = (props: ISuggestList) => {
  const {
    keywords,
    showSuggest,
    historyList,
    hotList,
    getHistoryListDispatch,
    getHotListDispatch,
    clearHistoryList,
  } = props;

  useEffect(() => {
    getHistoryListDispatch();
    getHotListDispatch();
  }, []);

  return (
    <div className={root}>
      <SearchBox />
      <div className={content}>
        {showSuggest && keywords ? (
          <SuggestList />
        ) : keywords ? (
          <SearchResult />
        ) : (
          <Scroll>
            <div className={searchTagContent}>
              <SerachList label="历史搜索" list={historyList} iconClick={clearHistoryList} />
              <SerachList label="热门搜索" list={hotList} />
            </div>
          </Scroll>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  keywords: state.getIn(['search', 'keywords']) || '',
  showSuggest: state.getIn(['search', 'showSuggest']) || false,
  historyList: state.getIn(['search', 'historyList'])?.toJS() || [],
  hotList: state.getIn(['search', 'hotList'])?.toJS() || [],
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    getHistoryListDispatch() {
      dispatch(action.getHistoryList());
    },
    getHotListDispatch() {
      dispatch(action.getHotList());
    },
    clearHistoryList() {
      dispatch(action.changeHistoryList([]));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
