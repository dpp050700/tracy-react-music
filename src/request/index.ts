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
export const userLogin = (phone: string, password: string) => {
  return axiosInstance.get(`/login/cellphone?phone=${phone}&password=${password}`);
};
