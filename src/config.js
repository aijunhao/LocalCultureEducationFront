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

  // 获取评论初始化数据
  EXECUTE_GET_COMMENTS: `${BASE_URL}/nature/comments`,
  // 添加评论初始化数据
  EXECUTE_POST_COMMENTS: `${BASE_URL}/nature/comments`,
  // 获取图片详情
  EXECUTE_GET_IMAGE_INFO: `${BASE_URL}/nature/imageinfo`,
  // 点赞
  EXECUTE_ADD_THUMBS: `${BASE_URL}/nature/addthumbs`,
  // 获取普陀十二景
  EXECUTE_GET_TWELVE_SCENERIES: `${BASE_URL}/nature/twelve-sceneries`,

  // 地理
  // 地图信息
  EXECUTE_GET_MAP_INFO: `${BASE_URL}/location/mapInfo`,
  // 图表数据信息
  EXECUTE_GET_LOCATION_Chart_DATA_INFO: `${BASE_URL}/location/chartData`,

  // 文化首页
  EXECUTE_GET_CULTURE_HOME: `${BASE_URL}/buddhism/getCultureHomeContent`,
  // 获取博物馆文章
  EXECUTE_GET_MUSEUM_ARTICLE: `${BASE_URL}/buddhism/museumArticle`,
  // 获取博物馆展品数据
  EXECUTE_GET_EXHIBITS: `${BASE_URL}/buddhism/exhibits`,
  // 获取寺庙庵堂数据
  EXECUTE_GET_BUILDING: `${BASE_URL}/buddhism/building`,
  // 获取文化节数据
  EXECUTE_GET_CULTURE: `${BASE_URL}/buddhism/culture`,
  // 获取观音法界轮播图数据
  EXECUTE_GET_GUANYIN_CAROUSEL: `${BASE_URL}/buddhism/carousel`,
  // 获取观音法界单体项目数据
  EXECUTE_GET_GUANYIN_PROJECT: `${BASE_URL}/buddhism/project`,
  // 获取观音法界文章
  EXECUTE_GET_GUANYIN_ARTICLE: `${BASE_URL}/buddhism/article`,
  // 获取普陀寺庙庵堂
  EXECUTE_GET_BUILDING_ARTICLE: `${BASE_URL}/buddhism/buildingArticle`,
  // 获取普陀寺庙庵堂
  EXECUTE_GET_BUILDING_MUSEUM_INFO: `${BASE_URL}/buddhism/museumInfo`,

  // 海天佛国首页
  EXECUTE_GET_BUDDHISM_HOME: `${BASE_URL}/buddhism/getBuddhismHomeContent`,

  // 佛国编年史首页
  EXECUTE_GET_HISTORY_HOME: `${BASE_URL}/buddhism/getHistoryHomeContent`,
  // 佛国编年史僧侣信息
  EXECUTE_GET_BUDDHISM_MONK: `${BASE_URL}/buddhism/getMonk`,
  // 佛国编年史文章信息
  EXECUTE_GET_HISTORY_ARTICLE: `${BASE_URL}/buddhism/historyArticle`,

  // 管理员页面
  // 更新页面导航信息
  EXECUTE_POST_UPDATE_NAVIGATION_MESSAGE: `${BASE_URL}/user/updateNavigation`,
  // 更新文章信息
  EXECUTE_POST_UPDATE_ARTICLE_MESSAGE: `${BASE_URL}/user/updateArticle`,
  // 发布文章
  EXECUTE_POST_NEW_ARTICLE: `${BASE_URL}/user/newArticle`,
  // 删除文章
  EXECUTE_GET_DELETE_ARTICLE: `${BASE_URL}/user/deleteArticle`,
  // 上传图片
  EXECUTE_POST_UPLOAD_IMAGE: `${BASE_URL}/user/upload`,
  // 删除图片
  EXECUTE_GET_DELETE_IMAGE: `${BASE_URL}/user/deleteImage`,
  // 创建图片
  EXECUTE_GET_NEW_IMAGE: `${BASE_URL}/user/newImage`,
  // 更新文本
  EXECUTE_POST_UPDATE_TEXT: `${BASE_URL}/user/updateText`,
  // 创建文本
  EXECUTE_GET_NEW_TEXT: `${BASE_URL}/user/newText`,
  // 删除文章
  EXECUTE_GET_DELETE_TEXT: `${BASE_URL}/user/deleteText`,
  // 创建图表数据
  EXECUTE_GET_NEW_CHART_DATA: `${BASE_URL}/user/newChartData`,
  // 删除图表数据
  EXECUTE_GET_DELETE_CHART_DATA: `${BASE_URL}/user/deleteChartData`,
  // 更新图表数据
  EXECUTE_POST_UPDATE_CHART_DATA: `${BASE_URL}/user/updateChartData`,

  // 用户登录
  // 用户名校验
  EXECUTE_POST_USERNAME_CHECK: `${BASE_URL}/user/usernameCheck`,
  // 登录
  EXECUTE_POST_LOGIN: `${BASE_URL}/user/login`,
  // 用户名注册
  EXECUTE_POST_REGISTER: `${BASE_URL}/user/register`,
  // 用户登录信息
  EXECUTE_GET_LONGIN_AND_REGISTER_OVERVIEW: `${BASE_URL}/user/getUserLoginStatistics`,
  // 用户信息统计
  EXECUTE_GET_USER_OVERVIEW: `${BASE_URL}/user/getUserOverview`,
  // 获取用户数量信息
  EXECUTE_GET_USER: `${BASE_URL}/user/getUser`,
  // 获取用户数量信息
  EXECUTE_GET_USER_NUMBER: `${BASE_URL}/user/getUserNumber`,
  // 修改用户信息
  EXECUTE_POST_USER_INFO: `${BASE_URL}/user/updateUserInfo`,
  // 修改用户信息
  EXECUTE_GET_DELETE_USER: `${BASE_URL}/user/deleteUser`,
  // 修改用户权限
  EXECUTE_POST_UPADTE_USER_POWER: `${BASE_URL}/user/updateUserPower`,
  // 获取评论，进行验证
  EXECUTE_GET_COMMENTS_EXAMINE: `${BASE_URL}/user/examine`,
  // 修改评论
  EXECUTE_POST_UPADTE_COMMENTS: `${BASE_URL}/user/updateComments`,
  // 删除评论
  EXECUTE_GET_DELETE_COMMENTS: `${BASE_URL}/user/deleteComments`,
  // 获取评论总数
  EXECUTE_GET_COMMENTS_NUMMBER: `${BASE_URL}/user/getCommentsNumber`
};
