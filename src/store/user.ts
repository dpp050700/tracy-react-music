import { fromJS } from 'immutable';

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

export default (state = defaultState, action: IAction) => {
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
