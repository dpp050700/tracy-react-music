import { combineReducers } from 'redux-immutable';
import { reducer as recommend } from '../views/Recommend/store/index';
import { reducer as search } from '../views/Search/store/index';
import user from './user';

export default combineReducers({
  recommend,
  user,
  search,
});
