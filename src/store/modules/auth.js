import { isEmpty } from 'lodash';
import {
  getAuthUser,
  enableUser,
  updateUser,
  login,
  logout,
  signup,
  sendPassword,
  resetPassword,
  resendVerifyMail
} from '@/api/auth';

import {
  setToken,
  removeToken
} from '@/utils/auth';

const state = {
  request: false,
  failure: null,
  user: {},
  token: ''
};

const mutations = {
  REQUEST: (state) => {
    state.request = true;
    state.failure = null;
  },
  AUTH_SUCCESS: (state, { token, user }) => {
    state.request = false;
    state.token = token;
    state.user = user;
  },
  AUTH_FAILURE: (state, error) => {
    state.request = false;
    state.failure = error.code;
  },
  CLEAR_USER: (state) => {
    state.token = null;
    state.user = {};
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_USER: (state, user) => {
    state.user = user;
  },
  SUCCESS: (state) => {
    state.request = false;
    state.failure = null;
  },
  FAILURE: (state, e) => {
    state.request = false;
    state.failure = e.code;
  }
};

const actions = {
  login: async ({ commit, dispatch, state }, form) => {
    commit('REQUEST');
    try {
      const { data } = await login({ ...form });
      commit('AUTH_SUCCESS', data.data);
      setToken(data.data.token);
      return true;
    } catch (error) {
      commit('AUTH_FAILURE', error);
    }
    return false;
  },
  getAuthUser: async ({ commit }) => {
    try {
      const { data } = await getAuthUser();
      commit('SET_USER', data.data);
    } catch (error) {
      commit('CLEAR_USER');
      removeToken();
    }
  },
  logout: async ({ dispatch }) => {
    await logout();
    dispatch('clearUser');
  },
  signup: async ({ commit }, formData) => {
    commit('REQUEST');
    try {
      const { data } = await signup(formData);
      commit('SUCCESS', data);
      return true;
    } catch (error) {
      commit('FAILURE', error);
    }
    return false;
  },
  enableUser: async ({ commit }, token) => {
    commit('REQUEST');
    try {
      const { data } = await enableUser(token);
      commit('SUCCESS', data);
      return true;
    } catch (error) {
      commit('FAILURE', error);
    }
    return false;
  },
  updateUser: async ({ commit }, formData) => {
    commit('REQUEST');
    try {
      const { data } = await updateUser(formData);
      commit('SUCCESS', data);
      return true;
    } catch (error) {
      commit('FAILURE', error);
    }
    return false;
  },
  clearUser: ({ commit }) => {
    commit('CLEAR_USER');
    removeToken();
  },
  setToken: ({ commit }, token) => {
    commit('SET_TOKEN', token);
  },
  sendResetMail: async ({ commit }, email) => {
    commit('REQUEST');
    try {
      const { data } = await sendPassword(email);
      commit('SUCCESS', data);
      return true;
    } catch (error) {
      commit('FAILURE', error);
    }
    return false;
  },
  resetUserPassword: async ({ commit }, formData) => {
    commit('REQUEST');
    try {
      const { data } = await resetPassword(formData.token, formData);
      commit('SUCCESS', data);
      return true;
    } catch (error) {
      commit('FAILURE', error);
    }
    return false;
  },
  resendUserEmail: async ({ commit }, email) => {
    commit('REQUEST');
    try {
      const { data } = await resendVerifyMail(email);
      commit('SUCCESS', data);
      return true;
    } catch (error) {
      commit('FAILURE', error);
    }
    return false;
  }
};

const getters = {
  user: state => state.user,
  loading: state => isEmpty(state.user)
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
