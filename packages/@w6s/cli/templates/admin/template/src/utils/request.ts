import axios from 'axios';
import { Message } from 'element-ui';
import { UserModule } from '@/store/modules/user';

const service = axios.create({
  timeout: 5000,
});

// Request interceptors
service.interceptors.request.use(
  // code == 20000: success
  // code == 50001: invalid user (user not exist)
  (config) => {
    if (UserModule.token) {
      config.headers['X-Access-Token'] = UserModule.token;
    }
    return config;
  },
  (error) => error,
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject(new Error(res.message || 'Error'));
    }
    return res;
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
