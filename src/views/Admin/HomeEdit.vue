<template>
  <div id="home_edit">
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 轮播图 -->
    <div class="module-box">
      <p class="title">轮播图</p>
      <p class="tips">轮播图组件，此模块建议采用 JPG 格式的图片。</p>
      <carousel-edit :imgList="imgList" :type="2"></carousel-edit>
    </div>

    <!-- 首页导航模块 -->
    <div class="module-box">
      <p class="title">首页导航模块</p>
      <p class="tips">导航模块，由预览图片、模块名称、模块标题、模块内容及跳转页面组成，是全局信息的简介部分。</p>

      <div :key="i" v-for="(item, i) in moduleList">
        <module-edit :module="item"></module-edit>
      </div>
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
      // 图片列表
      imgList: [],
      moduleList: []
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
    getCarousel() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HOME_CAROUSEL
      })
        .then(data => {
          // console.log(data.data)
          if (data.data) this.imgList = data.data
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
          if (data.status === 200 && data.data) {
            this.moduleList = data.data
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
  }
}
</script>

<style lang="stylus">
#home_edit
  .module-box
    background #fff
    padding 50px
    margin-bottom 20px

  .breadcrumb
    line-height 64px

  .title
    font-size 1.5rem
    font-weight 600
    margin 0

  .tips
    font-size 0.9rem
    color #909399
</style>
