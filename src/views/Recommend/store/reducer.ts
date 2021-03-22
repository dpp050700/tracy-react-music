import { fromJS } from 'immutable';
import * as actionTypes from './constants';

interface IAction {
  type: string;
  data: any;
}

const defaultState = fromJS({
  bannerList: [],
  recommendList: [],
  enterLoading: true,
});

export default (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_BANNER:
      return state.set('bannerList', action.data);
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return state.set('recommendList', action.data);
    default:
      return state;
  }
};
