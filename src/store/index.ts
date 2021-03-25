import { combineReducers } from 'redux-immutable';
import { reducer as recommend } from '../views/Recommend/store/index';
import { reducer as login } from '../views/Login/store/index';
export default combineReducers({
  recommend,
  login,
});
