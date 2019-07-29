<template>
  <div id="home_edit">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 轮播图 -->
    <div class="home-edit-box">
      <p class="title">轮播图</p>
      <p class="tips">轮播图组件，此模块建议采用 JPG 格式的图片。</p>
      <carousel-edit :imageList="homeCarouselList" :type="2"></carousel-edit>
    </div>

    <!-- 首页导航模块 -->
    <div class="home-edit-box">
      <p class="title">首页导航模块</p>
      <p class="tips">导航模块，由预览图片、模块名称、模块标题、模块内容及跳转页面组成，是全局信息的简介部分。</p>

      <module-edit
        :disabled="moduleDisabled"
        :moduleList="moduleList"
        :showJumpModule="true"
        :showModuleName="true"
        :status="moduleStatus"
      ></module-edit>
    </div>

    <!-- 首页展示图片 -->
    <div class="home-edit-box">
      <p class="title">普陀美景模块</p>
      <p class="tips">此模块最佳图片数量为 7 张，默认导航页面为 海天佛国 > 普陀山水</p>

      <carousel-edit :imageList="homeSceneryList" :type="7"></carousel-edit>
    </div>
  </div>
</template>
 
<script>
import config from '../../config'
import ModuleEdit from '../../components/ModuleEdit'
import CarouselEdit from '../../components/CarouselEdit'

export default {
  data() {
    return {
      // 轮播图片列表
      homeCarouselList: [],
      // 
      homeSceneryList: [],
      moduleList: [],
      moduleDisabled: [],
      moduleStatus: []
    }
  },
  components: {
    'module-edit': ModuleEdit,
    'carousel-edit': CarouselEdit
  },
  methods: {
    /**
     * 获取轮播图数据
     */
    getScenery() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HOME_NATURE_IMAGES
      })
        .then(data => {
          // console.log(data.data)
          if (data.data) this.homeSceneryList = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取轮播图数据
     */
    getCarousel() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HOME_CAROUSEL
      })
        .then(data => {
          // console.log(data.data)
          if (data.data) this.homeCarouselList = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取初始化页面数据
     */
    initModule() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HOME_COMTENT
      })
        .then(data => {
          if (data.status === 200) {
            this.moduleList = data.data

            this.moduleDisabled = new Array(this.moduleList.length).fill(true)
            this.moduleStatus = new Array(this.moduleList.length).fill(0)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getCarousel()
    this.initModule()
    this.getScenery()
  }
}
</script>

<style lang="stylus">
#home_edit
  .home-edit-box
    background #fff
    padding 50px
    margin-bottom 20px

  .title
    font-size 1.5rem
    font-weight 600
    margin 0

  .tips
    font-size 0.9rem
    color #909399
</style>
