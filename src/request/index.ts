import axiosInstance from './axios';

/**
 * 获取首页轮播列表
 * @returns
 */
export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
};
/**
 * 获取首页热门推荐
 * @returns
 */
export const getRecommendRequest = () => {
  return axiosInstance.get('/personalized');
};

/**
 * 用户手机号登陆
 * @param phone
 * @param password
 * @returns
 */
export const httpUserLogin = (phone: string, password: string) => {
  return axiosInstance.get(`/login/cellphone?phone=${phone}&md5_password=${password}`);
};

/**
 * 退出登陆
 * @returns
 */
export const httpUserLogout = () => {
  return axiosInstance.get('/logout');
};

/**
 * 获取登陆状态
 * @returns
 */
export const httpLoginStatu = () => {
  return axiosInstance.get(`/login/status?timestamp=${new Date().getTime()}`);
};

/**
 * 获取用户详情
 * @returns
 */
export const httpUserDetail = (uid: number) => {
  return axiosInstance.get(`/user/detail?uid=${uid}`);
};

/**
 * 获取热搜列表
 */

export const httpHotSearch = () => {
  return axiosInstance.get('/search/hot/detail');
};
