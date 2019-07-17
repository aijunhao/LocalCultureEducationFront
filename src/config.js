/**
 * 封装网关域名及所有接口的方法名
 */

// // 云地址
// const BASE_URL = "http://120.79.254.54:3004";
// 本地测试
const BASE_URL = "http://localhost:3004";

export default {
  // 更路径
  BASE_URL: `${BASE_URL}`,
  // 图片
  PUBLIC_IMAGES: `${BASE_URL}/public/images`,
  // 获取地质信息
  EXECUTE_GET_GEOLOGY: `${BASE_URL}/location/geology`,
  // 获取地图位置描述信息
  EXECUTE_GET_LOCATION_INIT: `${BASE_URL}/location/`,
  // 获取 home 初始化数据
  EXECUTE_GET_HOME_COMTENT: `${BASE_URL}/getHomeContent`,
  // 获取 home 页面轮播图数据
  EXECUTE_GET_HOME_CAROUSEL: `${BASE_URL}/getHomeCarousel`,
  // 获取 home 页面展示图片数据
  EXECUTE_GET_HOME_NATURE_IMAGES: `${BASE_URL}/getHomeNatureImages`,
  // 获取 nature 初始化数据
  EXECUTE_GET_NATURE_INIT: `${BASE_URL}/nature`,
  // 获取 nature 初始化数据
  EXECUTE_GET_BUDDHISM_INIT: `${BASE_URL}/buddhism`,
  // 获取 nature 初始化数据
  EXECUTE_GET_EXHIBITS: `${BASE_URL}/buddhism/exhibits`,
  // 获取评论初始化数据
  EXECUTE_COMMENTS: `${BASE_URL}/nature/comments`,
  // 获取图片详情
  EXECUTE_GET_IMAGE_INFO: `${BASE_URL}/nature/imageinfo`,
  // 点赞
  EXECUTE_ADD_THUMBS: `${BASE_URL}/nature/addthumbs`,
  // 获取普陀十二景
  EXECUTE_GET_TWELVE_SCENERIES: `${BASE_URL}/nature/twelve-sceneries`
};
