import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Location from "./views/Location.vue";
import Nature from "./views/Nature.vue";
import History from "./views/History.vue";
import Society from "./views/Society.vue";
import ChinaMap from "./components/ChinaMap.vue";
import ZheJiangMap from "./components/ZheJiangMap.vue";
import BaiduMap from "./components/BaiduMap.vue";
import Buddhism from "./views/Buddhism.vue";
import Fishery from "./views/Fishery.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: Home,
      name: "home"
    },
    {
      path: "/location",
      component: Location,
      name: "location",
      redirect: "/location/chinamap",
      children: [
        {
          path: "chinamap",
          component: ChinaMap,
          name: "chinamap"
        },
        {
          path: "zhejiangmap",
          component: ZheJiangMap,
          name: "zhejiangmap"
        },
        {
          path: "baidumap",
          component: BaiduMap,
          name: "baidumap"
        }
      ]
    },
    {
      path: "/nature",
      component: Nature,
      name: "nature"
    },
    {
      path: "/history",
      component: History,
      name: "history"
    },
    {
      path: "/society",
      component: Society,
      name: "society",
      redirect: "/society/buddhism",
      children: [
        {
          path: "buddhism",
          component: Buddhism,
          name: "buddhism"
        },
        {
          path: "fishery",
          component: Fishery,
          name: "fishery"
        }
      ]
    }
  ]
});
