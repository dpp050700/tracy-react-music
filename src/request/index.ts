import axiosInstance from './axios';

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
};
export const getRecommendRequest = () => {
  return axiosInstance.get('/personalized');
};

export default {
  getBannerRequest,
  getRecommendRequest,
};
