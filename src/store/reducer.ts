import { combineReducers } from 'redux-immutable';
import user from './user';
import { reducer as recommend } from '../views/Recommend/store/index';
import { reducer as search } from '../views/Search/store/index';
import { reducer as album } from '../views/Album/store/index';
import { reducer as player } from '../views/Player/store/index';

export default combineReducers({
  recommend,
  search,
  album,
  player,
  user,
});
