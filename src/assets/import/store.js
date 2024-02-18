import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    history: {},
    lastUrl: ""
  },
  actions: {
    // 在这里定义异步操作方法
  },
  mutations: {
    saveHistory(state, data) {
      state.history = data;
    },
    saveLastUrl(state, data) {
      state.lastUrl = data;
    }
  },
  getters: {
    getHistory(state) {
      return state.history;
    },
    getLastUrl(state) {
      return state.lastUrl;
    }
  }
});
