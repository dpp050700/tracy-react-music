import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { httpAlbumDetail } from '../../../request/index';

export const changeAlbumDetail = (data: any) => ({
  type: actionTypes.CHANGE_ALBUM_DETAIL,
  data: fromJS(data),
});
export const getAlbumDetail = (id: number) => {
  return (dispatch: any) => {
    httpAlbumDetail(id)
      .then((res: any) => {
        const action = changeAlbumDetail(res.playlist);
        dispatch(action);
      })
      .catch(() => {
        console.log('http error');
      });
  };
};
