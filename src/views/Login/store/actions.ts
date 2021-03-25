import { fromJS } from 'immutable';
import * as actionTypes from './constants';

export const changeStore1 = (data: any) => ({
  type: actionTypes.CHANGE_STORE1,
  data: fromJS(data),
});
export const getStore1 = () => {
  return (dispatch: any) => {
    const action = changeStore1({});
    dispatch(action);
  };
};
