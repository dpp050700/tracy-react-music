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
  result: [], // 搜索结果
  offset: 0, // 偏移数量
  total: 0,
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
    case actionTypes.CHANGE_SHOW_SUGGEST:
      return state.set('showSuggest', action.data);
    case actionTypes.CHANGE_SEARCH_RESULT:
      return state.set('result', action.data);
    case actionTypes.CHANGE_SEARCH_TOTAL:
      return state.set('total', action.data);
    case actionTypes.CHANGE_SEARCH_OFFSET:
      return state.set('offset', action.data);
    default:
      return state;
  }
};
