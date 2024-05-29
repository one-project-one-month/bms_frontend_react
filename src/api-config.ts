import axios from 'axios';
import Cookies from 'js-cookie';

const Axios = axios.create();

// add base url
Axios.defaults.baseURL = 'https://bms-backend-nodejs.vercel.app/api/v1';

// interceptors

// need to check the jwt token from cookies and add it to the request header
Axios.interceptors.request.use(
  (config) => {
    // const token = Cookies.get('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    // mock fn
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbkNvZGUiOiJibXNfNGEwMGI3NzIwNWI1OGYyMzI0YTNkZTFhMWE5ZWNjM2MiLCJyb2xlIjoiQWRtaW4iLCJpYXQiOjE3MTY5NzAxNzYsImV4cCI6MTcxNzA1NjU3Nn0.yBGJDjYb52zha2yh7HIDDp7YrW8vtujJ-hBsncsxiOA`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default Axios;
