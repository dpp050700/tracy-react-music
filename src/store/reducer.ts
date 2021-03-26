import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { reducer as recommend } from '../views/Recommend/store/index';

import * as actionTypes from './constants';

interface IAction {
  type: string;
  data: any;
}

const defaultState = fromJS({
  userInfo: {
    nickname: null,
    avatarUrl: null,
    backgroundUrl: null,
  },
  isLogin: false,
});

const user = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_USER_INFO:
      return state.set('userInfo', action.data);
    case actionTypes.CHANGE_USER_LOGIN_STATU:
      return state.set('isLogin', action.data);
    default:
      return state;
  }
};

export default combineReducers({
  recommend,
  user,
});
