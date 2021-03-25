import { fromJS } from 'immutable';
import * as actionTypes from './constants';

interface IAction {
  type: string;
  data: any;
}

const defaultState = fromJS({
  data: {},
});

export default (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_STORE1:
      return state.set('data', action.data);
    default:
      return state;
  }
};
