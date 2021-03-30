// import { combineReducers } from 'redux-immutable';
// import { reducer as recommend } from '../views/Recommend/store/index';
// import { reducer as search } from '../views/Search/store/index';

// export default combineReducers({
//   recommend,
//   search,
// });

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { reducer as recommend } from '../views/Recommend/store/index';
import { reducer as search } from '../views/Search/store/index';

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
  agreementChecked: false,
  messageNumber: 8,
});

const user = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_USER_INFO:
      return state.set('userInfo', action.data);
    case actionTypes.CHANGE_USER_LOGIN_STATU:
      return state.set('isLogin', action.data);
    case actionTypes.CHANGE_USER_AGREEMENT_CHECKED:
      return state.set('agreementChecked', action.data);
    default:
      return state;
  }
};

export default combineReducers({
  recommend,
  user,
  search,
});
