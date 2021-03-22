import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { getBannerRequest, getRecommendRequest } from '../../../request/index';

import { IBannerItem } from '../components/Banner/Banner';
import { IRecommendList } from '../components/RecommendList/RecommendList';

export const changeBannerList = (data: IBannerItem[]) => ({
  type: actionTypes.CHANGE_BANNER,
  data: fromJS(data),
});

export const changeRecommendList = (data: IRecommendList[]) => {
  return {
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data),
  };
};

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

export const getRecommendList = () => {
  return (dispatch: any) => {
    getRecommendRequest()
      .then((res: any) => {
        const action = changeRecommendList(res.result);
        dispatch(action);
      })
      .catch(() => {
        console.log('http request error: recommend');
      });
  };
};
