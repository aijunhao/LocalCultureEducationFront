import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from "./config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 图片选中项
    imageInfoId: ""
  },
  mutations: {
    /**
     * 图片详情存储
     */
    IMAGEINFOID_STORE: (state, value) => {
      state.imageInfoId = parseInt(value);
    }
  },
  actions: {
    imageInfoId({ commit }, value) {
      // sessionSotre 存储
      sessionStorage.setItem("imageInfoId", value);
      commit("IMAGEINFOID_STORE", value);
    }
  }
});
