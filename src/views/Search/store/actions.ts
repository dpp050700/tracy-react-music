import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { ISearchItem } from '../components/SerachList/SerachList';
import { httpHotSearch, httpSearchSuggest, httpSearchResult } from '../../../request/index';

const STORAGE_HISTORY_KEY = '__tracy_music_react_history_search__';

export const changeHotList = (data: ISearchItem[]) => ({
  type: actionTypes.CHANGE_HOT_LIST,
  data: fromJS(data),
});
export const changeHistoryList = (data: ISearchItem[]) => {
  localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(data));
  return {
    type: actionTypes.CHANGE_HISTORY_LIST,
    data: fromJS(data),
  };
};
export const changeSearchKeywords = (data: string) => ({
  type: actionTypes.CHANGE_SEARCH_KEYWORDS,
  data: fromJS(data),
});
export const changeSuggestList = (data: any[]) => ({
  type: actionTypes.CHANGE_SUGGEST_LIST,
  data: fromJS(data),
});

export const changeShowSuggest = (data: boolean) => ({
  type: actionTypes.CHANGE_SHOW_SUGGEST,
  data: fromJS(data),
});

export const changeSearchList = (data: any[]) => ({
  type: actionTypes.CHANGE_SEARCH_RESULT,
  data: fromJS(data),
});

export const changeSearchTotal = (data: number) => ({
  type: actionTypes.CHANGE_SEARCH_TOTAL,
  data: fromJS(data),
});

export const changeSearchOffset = (data: number) => ({
  type: actionTypes.CHANGE_SEARCH_OFFSET,
  data: fromJS(data),
});

export const getHotList = () => {
  return (dispatch: any) => {
    httpHotSearch().then((res: any) => {
      const { data } = res;
      const list = data.map((item: any) => {
        return {
          label: item.searchWord,
        };
      });
      const action = changeHotList(list);
      dispatch(action);
    });
  };
};

export const getHistoryList = () => {
  return (dispatch: any) => {
    const storage = localStorage.getItem(STORAGE_HISTORY_KEY) || '[]';
    const historyList = JSON.parse(storage) || [];
    const data = <ISearchItem[]>historyList;
    const action = changeHistoryList(data);
    dispatch(action);
  };
};

export const loadMoreSearchResult = () => {
  return (dispatch: any, getState: any) => {
    const keywords = getState().getIn(['search', 'keywords']);
    const offset = getState().getIn(['search', 'offset']);
    const total = getState().getIn(['search', 'total']);
    const lastList = getState().getIn(['search', 'result']).toJS();
    if (offset !== 0 && offset >= total) {
      alert('????????????????????????');
      return;
    }
    httpSearchResult(keywords, offset).then((res: any) => {
      const list = res.result.songs || [];
      dispatch(changeSearchList([...lastList, ...list]));
      dispatch(changeSearchTotal(res.result.songCount));
      dispatch(changeSearchOffset(list.length + lastList.length));
    });
  };
};

export const getSearchValue = (keywords: string) => {
  return (dispatch: any, getState: any) => {
    if (!keywords) {
      alert('????????????????????????');
      return;
    }
    dispatch(changeSearchKeywords(keywords));
    const arr: ISearchItem[] = getState().toJS().search.historyList;
    const index = arr.findIndex(item => item.label === keywords);
    if (index > -1) {
      arr.splice(index, 1);
    }
    arr.unshift({ label: keywords });

    const action = changeHistoryList(arr);
    dispatch(action);
    dispatch(changeShowSuggest(false));
    dispatch(changeSearchList([]));
    dispatch(changeSearchOffset(0));
    dispatch(loadMoreSearchResult());
  };
};

export const getSuggestList = (keywords: string) => {
  if (!keywords) {
    return (dispatch: any) => {
      const action = changeSuggestList([]);
      dispatch(action);
    };
  }
  return (dispatch: any) => {
    httpSearchSuggest(keywords).then((res: any) => {
      const { result } = res;
      const list = result.allMatch || [];
      const action = changeSuggestList([{ keyword: keywords }, ...list]);
      dispatch(action);
    });
  };
};
