import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from "./config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 图片选中项
    imageInfoId: "",
    // 用户信息
    user: {
      id: "",
      username: "",
      power: "",
      powername: "",
      portrait: "",
      gender: "",
      info: ""
    },
    // 是否登录
    isLogin: false
  },
  getters: {
    // isLogin: state => state.isLogin
    isLogin: state => {
      if (sessionStorage.getItem("user")) {
        // console.log(JSON.parse(sessionStorage.getItem("user")));
        // 将用户名和 ID 放入 vuex
        state.user = JSON.parse(sessionStorage.getItem("user"));
        state.isLogin = true;
      }
      return state.isLogin;
    }
  },
  mutations: {
    /**
     * 图片详情存储
     */
    IMAGEINFOID_STORE: (state, value) => {
      state.imageInfoId = parseInt(value);
    },
    /**
     * 账户存储
     */
    USER_STORE: (state, value) => {
      state.user = value;
      state.isLogin = true;
    },
    /**
     * 登出
     */
    LOGOUT: state => {
      state.user = {};
      state.isLogin = false;
    }
  },
  actions: {
    imageInfoId({ commit }, value) {
      // sessionSotre 存储
      sessionStorage.setItem("imageInfoId", value);
      commit("IMAGEINFOID_STORE", value);
    },
    // 用户信息存储
    userStore({ commit }, value) {
      // console.log(JSON.stringify(value));
      // 数据格式化
      if (value.gender === 0) value.gender = "男";
      else value.gender = "女";
      let powername = [
        "普通用户",
        "普通用户",
        "普通用户",
        "普通用户",
        "普通用户",
        "被警告的用户",
        "账户被冻结的用户",
        "管理员",
        "管理员",
        "管理员",
        "超级管理员"
      ];
      value.powername = powername[value.power];
      // 保存到 session
      sessionStorage.setItem("user", JSON.stringify(value));
      commit("USER_STORE", value);
    },
    // 登出
    logout({ commit }) {
      sessionStorage.removeItem("user");
      commit("LOGOUT");
    }
  }
});
