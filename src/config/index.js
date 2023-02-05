import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/zh-TW';
import 'element-ui/lib/theme-chalk/index.css';

import { getToken } from '@/utils/auth';

import createRouter from './router';
import initialHttp from './http';

Vue.use(ElementUI, { locale });

export default store => {
  const token = getToken();
  if (store.state.auth.token !== token && token !== null) {
    store.dispatch('auth/setToken', token);
  }

  const router = createRouter(store);
  initialHttp(store, router);
  return { router };
};
