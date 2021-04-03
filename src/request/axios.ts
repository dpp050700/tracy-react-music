import axios from 'axios';

export const baseUrl = 'http://1.116.70.16:8880/';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  res => res.data,
  err => {
    console.log(err, '网络错误');
  },
);

export default axiosInstance;
