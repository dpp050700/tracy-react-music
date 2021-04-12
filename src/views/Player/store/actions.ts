import { fromJS } from 'immutable';
import { PlayerMode } from '../../../types/enum';
import * as actionTypes from './constants';
import { shuffle } from '../../../utils/utils';

export const changePlayList = (data: any) => ({
  type: actionTypes.CHANGE_PLAYLIST,
  data: fromJS(data),
});
export const changeSequenceList = (data: any) => ({
  type: actionTypes.CHANGE_SEQUENCE_LIST,
  data: fromJS(data),
});
export const changeCurrentIndex = (data: any) => ({
  type: actionTypes.CHANGE_CURRENT_INDEX,
  data: fromJS(data),
});
export const changeCurrentSong = (data: any) => ({
  type: actionTypes.CHANGE_CURRENT_SONG,
  data: fromJS(data),
});

export const changePlaying = (data: any) => ({
  type: actionTypes.CHANGE_PLAYER_PLAYING,
  data: fromJS(data),
});

export const changePlayerFull = (data: any) => ({
  type: actionTypes.CHANGE_PLAYER_FULL,
  data: fromJS(data),
});

export const changePlayerMode = (data: any) => ({
  type: actionTypes.CHANGE_PLAYER_MODE,
  data: fromJS(data),
});

export const initPlayerData = (playList: any[]) => {
  return (dispatch: any, getState: any) => {
    if (playList.length) {
      const mode = getState().getIn(['player', 'mode']);
      let list = [...playList];
      if (mode === PlayerMode.random) {
        list = shuffle(playList);
      }
      dispatch(changePlayList(playList));
      dispatch(changeSequenceList(list));
      dispatch(changeCurrentIndex(0));
      dispatch(changeCurrentSong(playList[0]));
    } else {
      dispatch(changePlayList([]));
      dispatch(changeSequenceList([]));
      dispatch(changeCurrentIndex(-1));
      dispatch(changeCurrentSong(null));
    }
  };
};

export const nextSong = () => {
  return (dispatch: any, getState: any) => {
    const mode = getState().getIn(['player', 'mode']);
    let currentIndex = getState().getIn(['player', 'currentIndex']);
    const sequenceList = getState().getIn(['player', 'sequenceList']).toJS();
    // const currentSong = getState().getIn(['player', 'currentSong'])?.toJS();
    if (mode === PlayerMode.loop) return;
    if (currentIndex === sequenceList.length - 1) {
      currentIndex = 0;
    }
    currentIndex += 1;
    const currentSong = sequenceList[currentIndex];
    dispatch(changeCurrentIndex(currentIndex));
    dispatch(changeCurrentSong(currentSong));
  };
};

export const togglePlayerMode = () => {
  return (dispatch: any, getState: any) => {
    const mode = getState().getIn(['player', 'mode']);
    let nextMode: number = 0;
    if (mode === 2) {
      nextMode = 0;
    } else {
      nextMode = mode + 1;
    }
    dispatch(changePlayerMode(nextMode));
  };
};
