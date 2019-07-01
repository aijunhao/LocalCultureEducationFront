/**
 * 封装网关域名及所有接口的方法名
 */

// 云地址
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
  EXECUTE_GET_HOME_INIT: `${BASE_URL}/`
};
