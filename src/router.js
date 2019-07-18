import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Location from "./views/Location.vue";
import Nature from "./views/Nature.vue";
import ImageInfo from "./views/ImageInfo.vue";
import ChinaMap from "./components/ChinaMap.vue";
import ZheJiangMap from "./components/ZheJiangMap.vue";
import BaiduMap from "./components/BaiduMap.vue";
import Culture from "./views/Buddhism/Culture.vue";
import CultureHome from "./views/Buddhism/CultureHome.vue";
import BuddhismHome from "./views/Buddhism/BuddhismHome.vue";
import Scenery from "./views/Buddhism/Scenery.vue";
import Museum from "./views/Buddhism/Museum.vue";
import Building from "./views/Buddhism/Building.vue";
import Guanyin from "./views/Buddhism/Guanyin.vue";
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
      path: "/buddhism/buddhismhome",
      component: BuddhismHome,
      name: "buddhismhome"
    },
    {
      path: "/buddhism/culture",
      component: Culture,
      name: "culture"
    },
    {
      path: "/buddhism/culturehome",
      component: CultureHome,
      name: "culturehome"
    },
    {
      path: "/buddhism/history",
      component: History,
      name: "history"
    },
    {
      path: "/buddhism/building",
      component: Building,
      name: "building"
    },
    {
      path: "/buddhism/guanyin",
      component: Guanyin,
      name: "guanyin"
    },
    {
      path: "/buddhism/museum",
      component: Museum,
      name: "museum"
    },
    {
      path: "/buddhism/scenery",
      component: Scenery,
      name: "scenery"
    },
    {
      path: "/fishery",
      component: Fishery,
      name: "fishery"
    }
  ]
});
