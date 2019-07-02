import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import config from "./config";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 地质信息
    geology: {
      overview: "",
      detail: [
        {
          name: "",
          content: ""
        }
      ]
    },
    // 地质信息选中项
    geologyAreaSelected: {
      name: "",
      content: ""
    },
    geologyLineSelected: {
      name: "",
      content: ""
    },
    // 植被信息
    plant: {
      overview: "",
      detail: [
        {
          name: "",
          content: ""
        }
      ]
    },
    // 植被信息选中项
    plantSelected: {
      name: "",
      content: ""
    }
  },
  mutations: {
    /**
     * 地址信息选中项
     */
    SELECT_ECHARTS(state, params) {
      if (params.index === 1) {
        if (params.componentIndex === 0) {
          state.geologyAreaSelected = state.geology.detail.find(
            item => item.name === params.name
          );
        } else {
          state.geologyLineSelected = state.geology.detail.find(
            item => item.name === params.name
          );
        }
      } else if (params.index === 2) {
        state.plantSelected = state.plant.detail.find(
          item => item.name === params.name
        );
      }
    },
    /**
     * 设置 geology 地质信息
     */
    SET_GEOLOGY: (state, value) => {
      state.geology = value;
    },
    /**
     * 设置 geology 地质信息
     */
    SET_PLANT: (state, value) => {
      state.plant = value;
    }
  },
  actions: {}
});
