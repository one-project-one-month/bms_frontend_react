import axios from 'axios';
import Cookies from 'js-cookie';

const Axios = axios.create();

// add base url
Axios.defaults.baseURL = 'http://localhost:3000/api/v1';

// interceptors

// need to check the jwt token from cookies and add it to the request header
Axios.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default Axios;
