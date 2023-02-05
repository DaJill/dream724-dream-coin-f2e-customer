import {
  getProductList,
  getProduct
} from '@/api/product';

const initPagination = () => ({
  last_page: 1,
  current_page: 1,
  per_page: 15,
  total: 0
});

const state = {
  request: false,
  failure: null,
  lists: [],
  detail: {
    end_date: '',
    price_target: 0,
    raised: 0,
    percent: 0
  },
  pagination: initPagination()
};

const mutations = {
  REQUEST: (state) => {
    state.request = true;
    state.failure = null;
  },
  SET_ORDERS: (state, orders) => {
    state.orders = orders;
  },
  GET_SUCCESS: (state, { data, ...pagination }) => {
    state.request = false;
    state.lists = data;
    state.pagination = pagination;
  },
  GET_FAILURE: (state, error) => {
    state.request = false;
    state.lists = [];
    state.failure = error.code;
  },
  GET_DETAIL_SUCCESS: (state, { data }) => {
    state.request = false;
    data.percent = ((data.raised / data.price_target) * 100).toFixed(0);
    data.width = (data.percent >= 100) ? 100 : data.percent;
    state.detail = data;
  },
  GET_DETAIL_FAILURE: (state, error) => {
    state.request = false;
    state.detail = [];
    state.failure = error.code;
  },
  UPDATE_CURRENT_PAGE: (state, page) => {
    state.pagination.current_page = page;
  },
  INIT_PAGINATION: (state) => {
    state.pagination = initPagination();
  }
};

const actions = {
  getLists: async ({ state, commit }, page = 1) => {
    commit('REQUEST');
    try {
      const page = state.pagination.current_page;
      const { data } = await getProductList({ page });
      commit('GET_SUCCESS', data.data);
    } catch (e) {
      commit('GET_FAILURE', e);
    }
  },
  getDetail: async ({ state, commit }, code) => {
    commit('REQUEST');
    try {
      const { data } = await getProduct(code);
      commit('GET_DETAIL_SUCCESS', data);
    } catch (e) {
      commit('GET_DETAIL_FAILURE', e);
    }
  },
  updatePage: ({ commit }, page) => {
    commit('UPDATE_CURRENT_PAGE', page);
  },
  initPagination: ({ commit }) => {
    commit('INIT_PAGINATION');
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
