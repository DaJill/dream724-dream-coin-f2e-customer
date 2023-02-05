import 'es6-promise/auto';
import Vue from 'vue';

import App from '@/App.vue';
import store from '@/store';
import initialConfig from '@/config';

import '@/assets/main.css';

const { router } = initialConfig(store);

Vue.config.devtools = process.env.VUE_APP_API_ENV !== 'production';
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
