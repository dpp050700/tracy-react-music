import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { PlayerMode } from '../../../types/enum';

interface IAction {
  type: string;
  data: any;
}

const defaultState = fromJS({
  currentIndex: null,
  currentSong: null,
  playList: [],
  sequenceList: [],
  mode: PlayerMode.sequence,
});

export default (state = defaultState, action: IAction) => {
  switch (action.type) {
    case actionTypes.CHANGE_PLAYLIST:
      return state.set('playList', action.data);
    case actionTypes.CHANGE_SEQUENCE_LIST:
      return state.set('sequenceList', action.data);
    case actionTypes.CHANGE_CURRENT_INDEX:
      return state.set('currentIndex', action.data);
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set('currentSong', action.data);
    default:
      return state;
  }
};
