import {
  createOrder,
  getOrderRecord,
  getOrderDetail
} from '@/api/order';

import {
  setOrder,
  getOrder,
  removeOrder,
  checkOrder
} from '@/utils/order';

const initPagination = () => ({
  last_page: 1,
  current_page: 1,
  per_page: 15,
  total: 0
});

const state = {
  request: false,
  failure: null,
  order: {},
  lists: {},
  payway: {},
  pagination: initPagination(),
  detail: {}
};

const mutations = {
  REQUEST: (state) => {
    state.request = true;
    state.failure = null;
  },
  SUCCESS: (state, { data }) => {
    state.request = false;
    state.failure = null;
    state.payway = data;
  },
  FAILURE: (state, e) => {
    state.request = false;
    state.payway = {};
    state.failure = e.code;
  },
  GET_DETAIL_SUCCESS: (state, { data }) => {
    state.detail = data[0];
    state.failure = null;
  },
  GET_DETAIL_FAILURE: (state, error) => {
    state.request = false;
    state.detail = {};
    state.failure = error.response.data.code;
  },
  GET_RECORD_SUCCESS: (state, { data }) => {
    state.lists = data;
  },
  GET_ORDER_FAILURE: (state, error) => {
    state.request = false;
    state.lists = [];
    state.failure = error.code;
  },
  UPDATE_CURRENT_PAGE: (state, page) => {
    state.pagination.current_page = page;
  },
  INIT_PAGINATION: (state) => {
    state.pagination = initPagination();
  },
  INIT_SUCCESS: (state) => {
    state.request = false;
    state.failure = null;
  }
};

const actions = {
  addOrder: async ({ commit, dispatch, state }, form) => {
    commit('REQUEST');
    try {
      removeOrder();
      setOrder(form);
      return true;
    } catch (error) {
      return false;
    }
  },
  getLists: async ({ state, commit }, page = 1) => {
    commit('REQUEST');
    try {
      const page = state.pagination.current_page;
      const { data } = await getOrderRecord({ page });
      commit('GET_RECORD_SUCCESS', data.data);
    } catch (e) {
      commit('GET_ORDER_FAILURE', e);
    }
  },
  createOrder: async ({ commit }, formData) => {
    commit('REQUEST');
    try {
      const { data } = await createOrder(formData);
      commit('SUCCESS', data);
      removeOrder();
      return true;
    } catch (error) {
      commit('FAILURE', error);
    }
    return false;
  },
  clearOrder: ({ commit }) => {
    commit('REQUEST');
    try {
      removeOrder();
      return true;
    } catch (error) {
    }
    return false;
  },
  checkOrderItem: ({ commit }) => {
    return checkOrder();
  },
  updatePage: ({ commit }, page) => {
    commit('UPDATE_CURRENT_PAGE', page);
  },
  initPagination: ({ commit }) => {
    commit('INIT_PAGINATION');
  },
  initSuccess: ({ commit }) => {
    commit('INIT_SUCCESS');
  },
  getDetail: async ({ state, commit }, no) => {
    try {
      const { data } = await getOrderDetail(no);
      commit('GET_DETAIL_SUCCESS', data);
      return true;
    } catch (e) {
      commit('GET_DETAIL_FAILURE', e);
      return false;
    }
  }
};

const getters = {
  order: state => getOrder()
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
