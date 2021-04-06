import { fromJS } from 'immutable';
import * as actionTypes from './constants';

interface IAction {
  type: string;
  data: any;
}

const defaultState = fromJS({
  albumDetail: {},
});

export default (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_ALBUM_DETAIL:
      return state.set('albumDetail', action.data);
    default:
      return state;
  }
};
