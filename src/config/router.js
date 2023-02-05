import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/router';
import { isEmpty } from 'lodash';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false })

const routerPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error);
};

Vue.use(Router);

export default (store) => {
  const router = new Router({
    routes,
    mode: 'history',
    scrollBehavior: (to, from, savedPosition) => savedPosition || { x: 0, y: 0 }
  });

  router.beforeEach(async (to, from, next) => {
    NProgress.start();
    const { token, user } = store.state.auth;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    document.title = '圓夢 × 一起用夢想讓世界更美好';
    if (to.meta.title) {
      document.title = to.meta.title + ' | ' + document.title;
    }

    if (token && isEmpty(user) && to.path !== '/network_error') {
      await store.dispatch('auth/getAuthUser');
    }

    if (token && (to.path === '/member/login')) {
      next('/');
    } else if (!token && requiresAuth) {
      next({
        path: '/member/login',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  });

  router.afterEach((to, from) => {
    NProgress.done();
  })

  return router;
};
