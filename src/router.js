import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Location from "./views/Location.vue";
import Nature from "./views/Nature.vue";
import ImageInfo from "./views/ImageInfo.vue";
import ChinaMap from "./components/ChinaMap.vue";
import ZheJiangMap from "./components/ZheJiangMap.vue";
import BaiduMap from "./components/BaiduMap.vue";

// 佛学文化
import Culture from "./views/Buddhism/Culture.vue";
import CultureHome from "./views/Buddhism/CultureHome.vue";
import BuddhismHome from "./views/Buddhism/BuddhismHome.vue";
import Scenery from "./views/Buddhism/Scenery.vue";
import Museum from "./views/Buddhism/Museum.vue";
import Building from "./views/Buddhism/Building.vue";
import GuanYin from "./views/Buddhism/Guanyin.vue";
import HistoryHome from "./views/Buddhism/HistoryHome.vue";
import History from "./views/Buddhism/History.vue";
import Monk from "./views/Buddhism/Monk.vue";

// 管理员页面
import Admin from "./views/Admin/Admin.vue";
import Overview from "./views/Admin/Overview.vue";
import HomeEdit from "./views/Admin/HomeEdit.vue";
import CultureEdit from "./views/Admin/CultureEdit.vue";
import ArticleInfoEdit from "./views/Admin/ArticleInfoEdit.vue";
import BuddhismEdit from "./views/Admin/BuddhismEdit.vue";
import HistoryEdit from "./views/Admin/HistoryEdit.vue";
import LocationEdit from "./views/Admin/LocationEdit.vue";

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
      name: "Location",
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
      path: "/admin",
      component: Admin,
      name: "admin",
      redirect: "/admin/overview",
      children: [
        {
          path: "overview",
          component: Overview,
          name: "Overview"
        },
        {
          path: "/homeedit",
          component: HomeEdit,
          name: "HomeEdit"
        },
        {
          path: "/cultureedit",
          component: CultureEdit,
          name: "CultureEdit"
        },
        {
          path: "/articleinfoedit",
          component: ArticleInfoEdit,
          name: "ArticleInfoEdit",
          props: true
        },
        {
          path: "/buddhismedit",
          component: BuddhismEdit,
          name: "BuddhismEdit"
        },
        {
          path: "/HistoryEdit",
          component: HistoryEdit,
          name: "HistoryEdit"
        },
        {
          path: "/LocationEdit",
          component: LocationEdit,
          name: "LocationEdit"
        }
      ]
    },

    {
      path: "/nature",
      component: Nature,
      name: "Nature"
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
      name: "BuddhismHome"
    },
    {
      path: "/buddhism/culture",
      component: Culture,
      name: "Culture"
    },
    {
      path: "/buddhism/culturehome",
      component: CultureHome,
      name: "CultureHome"
    },
    {
      path: "/buddhism/history",
      component: History,
      name: "History"
    },
    {
      path: "/buddhism/historyhome",
      component: HistoryHome,
      name: "HistoryHome"
    },
    {
      path: "/buddhism/building",
      component: Building,
      name: "building"
    },
    {
      path: "/buddhism/guanyin",
      component: GuanYin,
      name: "GuanYin"
    },
    {
      path: "/buddhism/museum",
      component: Museum,
      name: "Museum"
    },
    {
      path: "/buddhism/scenery",
      component: Scenery,
      name: "Scenery"
    },
    {
      path: "/buddhism/monk",
      component: Monk,
      name: "Monk"
    }
  ],
  // 回滚到顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
