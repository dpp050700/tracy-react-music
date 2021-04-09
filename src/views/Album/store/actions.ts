import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { httpAlbumDetail, httpCollectAlbum } from '../../../request/index';
import Toast from '../../../base/Toast/toast';

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
export const changeAlbumSubscribedStatus = () => {
  return (dispatch: any, getState: any) => {
    const detail = getState().getIn(['album', 'albumDetail']).toJS();
    const { subscribed } = detail;
    httpCollectAlbum(detail.id, subscribed ? 2 : 1)
      .then(() => {
        Toast.success({ content: '操作成功' });
        detail.subscribed = !detail.subscribed;
        const action = changeAlbumDetail(detail);
        dispatch(action);
      })
      .catch(() => {
        console.log('http error');
      });
  };
};
