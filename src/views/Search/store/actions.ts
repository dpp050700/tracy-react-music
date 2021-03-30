import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { ISearchItem } from '../components/SerachList/SerachList';
import { httpHotSearch } from '../../../request/index';

const STORAGE_HISTORY_KEY = '__tracy_music_react_history_search__';

export const changeHotList = (data: ISearchItem[]) => ({
  type: actionTypes.CHANGE_HOT_LIST,
  data: fromJS(data),
});
export const changeHistoryList = (data: ISearchItem[]) => ({
  type: actionTypes.CHANGE_HOT_LIST,
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
    const historyList = localStorage.getItem(STORAGE_HISTORY_KEY) || [];
    const data = <ISearchItem[]>historyList;
    const action = changeHistoryList(data);
    dispatch(action);
  };
};
