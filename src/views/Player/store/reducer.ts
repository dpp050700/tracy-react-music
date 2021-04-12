import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { PlayerMode } from '../../../types/enum';

interface IAction {
  type: string;
  data: any;
}

const defaultState = fromJS({
  currentIndex: -1,
  currentSong: null,
  playList: [],
  sequenceList: [],
  mode: PlayerMode.sequence,
  playing: false,
  isFull: false,
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
    case actionTypes.CHANGE_PLAYER_PLAYING:
      return state.set('playing', action.data);
    case actionTypes.CHANGE_PLAYER_FULL:
      return state.set('isFull', action.data);
    case actionTypes.CHANGE_PLAYER_MODE:
      return state.set('mode', action.data);
    default:
      return state;
  }
};
