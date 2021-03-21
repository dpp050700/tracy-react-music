import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { getBannerRequest } from '../../../request/index';

import { IBannerItem } from '../components/Banner/Banner';

export const changeBannerList = (data: IBannerItem[]) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data),
});

export const getBannerList = () => {
  return (dispatch: any) => {
    getBannerRequest()
      .then((data: any) => {
        const list: IBannerItem[] = data.banners;
        const action = changeBannerList(list);
        dispatch(action);
      })
      .catch(() => {
        console.log('http request error: banners');
      });
  };
};
