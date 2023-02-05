import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common['Route'] = process.env.VUE_APP_API_ROUTE;
axios.defaults.headers.common['Authenticate-Key'] = process.env.VUE_APP_API_KEY;

// eslint-disable-next-line no-unused-vars
export default (store, router) => {
  axios.interceptors.request.use(
    config => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${store.state.auth.token}`;
      }

      return config;
    },
    error => Promise.reject(error)
  );

  // 拋錯處理
  axios.interceptors.response.use(
    response => {
      const callBack = response.data;
      if (callBack.result !== true) {
        return Promise.reject(callBack);
      } else {
        return Promise.resolve(response);
      }
    }
  );

  axios.interceptors.response.use(
    response => response,
    error => {
      return Promise.reject(error);
    }
  );
};
