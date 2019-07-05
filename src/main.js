import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import echarts from "echarts";
import axios from "axios";
import moment from "moment";

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;

// 定义全局过滤器，格式化时间
Vue.filter("dataFormat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
