import Vue from "vue";
import Router from "vue-router";
import store from "./store";
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
import UserEdit from "./views/Admin/UserEdit.vue";

// 用户
import User from "./views/User/User.vue";
import Login from "./views/User/Login.vue";
import Register from "./views/User/Register.vue";
import UserHome from "./views/User/UserHome.vue";

Vue.use(Router);

let router = new Router({
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
      path: "/user",
      component: User,
      name: "User",
      redirect: "/user/login",
      children: [
        {
          path: "login",
          component: Login,
          name: "Login"
        },
        {
          path: "register",
          component: Register,
          name: "Register"
        }
      ]
    },
    {
      path: "/UserHome",
      component: UserHome,
      name: "UserHome",
      meta: {
        requireAuth: true
      }
    },
    {
      path: "/admin",
      component: Admin,
      name: "admin",
      redirect: "/admin/overview",
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: "overview",
          component: Overview,
          name: "Overview",
          meta: {
            requireAdmin: true
          }
        },
        {
          path: "homeedit",
          component: HomeEdit,
          name: "HomeEdit",
          meta: {
            requireAdmin: true
          }
        },
        {
          path: "cultureedit",
          component: CultureEdit,
          name: "CultureEdit",
          meta: {
            requireAdmin: true
          }
        },
        {
          path: "articleinfoedit",
          component: ArticleInfoEdit,
          name: "ArticleInfoEdit",
          props: true,
          meta: {
            requireAdmin: true
          }
        },
        {
          path: "buddhismedit",
          component: BuddhismEdit,
          name: "BuddhismEdit",
          meta: {
            requireAdmin: true
          }
        },
        {
          path: "HistoryEdit",
          component: HistoryEdit,
          name: "HistoryEdit",
          meta: {
            requireAdmin: true
          }
        },
        {
          path: "LocationEdit",
          component: LocationEdit,
          name: "LocationEdit",
          meta: {
            requireAdmin: true
          }
        },
        {
          path: "UserEdit",
          component: UserEdit,
          name: "UserEdit",
          meta: {
            requireAdmin: true
          }
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

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 需要普通用户登录权限
    if (store.getters.isLogin) {
      // 通过vuex state获取登录信息
      next();
    } else {
      next({
        path: "/user/login",
        // 将跳转的路由path作为参数，登录成功后跳转到该路由，这里只是参数，跳转需要在登录页面实现
        query: { redirect: to.fullPath }
      });
    }
  } else if (to.meta.requireAdmin) {
    // 需要管理员登录权限
    if (store.getters.isLogin) {
      // 通过vuex state获取登录信息
      if (store.state.user.power && store.state.user.power >= 8) next();
      else
        next({
          path: "/"
        });
    } else {
      next({
        path: "/user/login",
        // 将跳转的路由path作为参数，登录成功后跳转到该路由，这里只是参数，跳转需要在登录页面实现
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});
export default router;
