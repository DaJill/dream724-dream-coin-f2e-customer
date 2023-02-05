import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import order from './modules/order';
import product from './modules/product';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    auth,
    order,
    product
  }
});

if (module.hot) {
  module.hot.accept([
    './modules/auth',
    './modules/order',
    './modules/product'
  ], () => {
    store.hotUpdate({
      modules: {
        auth: require('./modules/auth').default,
        order: require('./modules/order').default,
        product: require('./modules/product').default
      }
    });
  });
}

export default store;
