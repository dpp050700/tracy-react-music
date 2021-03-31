import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { ISearchItem } from '../components/SerachList/SerachList';
import { httpHotSearch } from '../../../request/index';

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

export const getSearchValue = (keywords: string) => {
  return (dispatch: any, state: any) => {
    if (!keywords) {
      alert('请输入搜索关键词');
      return;
    }
    dispatch(changeSearchKeywords(keywords));
    const arr: ISearchItem[] = state().toJS().search.historyList;
    const index = arr.findIndex(item => item.label === keywords);
    if (index > -1) {
      arr.splice(index, 1);
    }
    arr.unshift({ label: keywords });

    const action = changeHistoryList(arr);
    dispatch(action);
  };
};
