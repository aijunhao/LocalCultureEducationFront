import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Location from "./views/Location.vue";
import Nature from "./views/Nature.vue";
import ImageInfo from "./views/ImageInfo.vue";
import ChinaMap from "./components/ChinaMap.vue";
import ZheJiangMap from "./components/ZheJiangMap.vue";
import BaiduMap from "./components/BaiduMap.vue";
import Buddhism from "./views/Buddhism.vue";
import BuddhismHome from "./views/Buddhism/BuddhismHome.vue";
import Building from "./views/Buddhism/Building.vue";
import History from "./views/Buddhism/History.vue";
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
      path: "/imageinfo",
      component: ImageInfo,
      name: "imageinfo",
      props: true
    },
    {
      path: "/buddhism",
      component: Buddhism,
      name: "buddhism",
      redirect: "/buddhism/buddhismhome",
      children: [
        {
          path: "buddhismhome",
          component: BuddhismHome,
          name: "buddhismhome"
        },
        {
          path: "history",
          component: History,
          name: "history"
        },
        {
          path: "building",
          component: Building,
          name: "building"
        }
      ]
    },
    {
      path: "/fishery",
      component: Fishery,
      name: "fishery"
    }
  ]
});
