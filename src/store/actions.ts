import { fromJS } from 'immutable';
import * as actionTypes from './constants';
import { httpUserLogin, httpLoginStatu, httpUserLogout } from '../request/index';

export interface IUserInfo {
  nickname: string;
  avatarUrl: string;
  backgroundUrl: string;
}

export const changeUserInfo = (data: IUserInfo) => ({
  type: actionTypes.CHANGE_USER_INFO,
  data: fromJS(data),
});

export const changeLoginStatu = (data: boolean) => ({
  type: actionTypes.CHANGE_USER_LOGIN_STATU,
  data: fromJS(data),
});

export interface ILoginParams {
  phone: string;
  password: string;
}
export const userLogin = (params: ILoginParams) => {
  return (dispatch: any) => {
    httpUserLogin(params.phone, params.password)
      .then((res: any) => {
        const data = {
          nickname: res.profile.nickname,
          avatarUrl: res.profile.avatarUrl,
          backgroundUrl: res.profile.backgroundUrl,
        };
        const action = changeUserInfo(data);
        dispatch(action);
      })
      .catch(() => {
        console.log('error');
      });
  };
};

export const getLoginStatu = () => {
  return (dispatch: any) => {
    httpLoginStatu()
      .then((res: any) => {
        const isLogin = res.data.code === 200;
        dispatch(changeLoginStatu(isLogin));
      })
      .catch(() => {});
  };
};

export const userLogout = () => {
  return (dispatch: any) => {
    httpUserLogout()
      .then(() => {
        dispatch(changeLoginStatu(false));
      })
      .catch(() => {});
  };
};
