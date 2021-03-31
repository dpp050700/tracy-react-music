import { fromJS } from 'immutable';
import * as actionTypes from './constants';

interface IAction {
  type: string;
  data: any;
}

const defaultState = fromJS({
  hotList: [],
  historyList: [],
  keywords: '',
  suggestList: [], // 搜索推荐
  showSuggest: true,
});

export default (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_HOT_LIST:
      return state.set('hotList', action.data);
    case actionTypes.CHANGE_HISTORY_LIST:
      return state.set('historyList', action.data);
    case actionTypes.CHANGE_SEARCH_KEYWORDS:
      return state.set('keywords', action.data);
    case actionTypes.CHANGE_SUGGEST_LIST:
      return state.set('suggestList', action.data);
    default:
      return state;
  }
};
