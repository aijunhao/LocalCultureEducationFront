import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/element.js";
import "./plugins/quilleditor.js";
import echarts from "echarts";
import axios from "axios";
// 时间格式化组件
import moment from "moment";
// 视频组件
import VueVideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
// 自定义图标
import "./assets/icons/iconfont.css";
import $ from "jquery";

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.prototype.$axios = axios;

Vue.use(VueVideoPlayer);

// 定义全局过滤器，格式化时间
Vue.filter("dataFormat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
