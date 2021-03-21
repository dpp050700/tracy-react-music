import axiosInstance from './axios';

export const getBannerRequest = () => {
  return axiosInstance.get('/banner');
};

export default {
  getBannerRequest,
};
