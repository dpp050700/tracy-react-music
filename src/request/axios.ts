import axios from 'axios';
import history from '../utils/history';
import Toast from '../base/Toast/toast';

export const baseUrl = 'http://cijianshaonian.com:8880/';

const axiosInstance = axios.create({
  baseURL: baseUrl,
});
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.response.use(
  res => {
    const { data, status } = res;
    if (status === 200 && data.code === 200) {
      return data;
    }
    return res.data;
  },
  error => {
    const {
      response: { data },
    } = error;
    const { code, msg } = data;
    if (code === 301) {
      history.push({
        pathname: '/login',
      });
      window.location.reload();
      return error;
    }
    Toast.error({ content: msg });
    return error;
  },
);

export default axiosInstance;
