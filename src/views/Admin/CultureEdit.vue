<template>
  <div id="culture_edit">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>佛国文化</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 右侧快速导航 -->
    <div id="right_menu">
      <p @click="goAnchor(0)">博物馆模块</p>
      <ul>
        <li
          :key="i"
          @click="goAnchor(1 + i)"
          v-for="(exhibit, i) in exhibitList"
        >{{ exhibit.title }}</li>
      </ul>

      <p @click="goAnchor(1 + exhibitList.length)">观音法界轮播图模块</p>
      <p @click="goAnchor(2 + exhibitList.length)">观音法界单体项目模块</p>
      <ul>
        <li
          :key="i"
          @click="goAnchor(3 + exhibitList.length + i)"
          v-for="(project, i) in guanyinSingleProjectList"
        >{{ project.title }}</li>
      </ul>

      <p @click="goAnchor(3 + exhibitList.length + guanyinSingleProjectList.length)">非物质文化遗产模块</p>
      <ul>
        <li
          :key="i"
          @click="goAnchor(4 + exhibitList.length + guanyinSingleProjectList.length + i)"
          v-for="(article, i) in articleList"
        >{{ article.title }}</li>
      </ul>
    </div>

    <!-- 博物馆页面编辑 -->
    <div class="culture-edit-box anchor-class">
      <p class="title">博物馆模块</p>
      <p class="tips">博物馆模块页面，主要包括博物馆介绍及展品展示等。</p>

      <!-- 展品展示 -->
      <image-edit
        :anchor="'anchor-class'"
        :disabled="imageDisabled"
        :imageList="exhibitList"
        :status="imageStatus"
        :type="5"
      ></image-edit>
    </div>

    <!-- 观音法界页面轮播图编辑 -->
    <div class="culture-edit-box anchor-class">
      <p class="title">观音法界轮播图模块</p>
      <p class="tips">轮播图组件，此模块建议采用 JPG 格式的图片。</p>
      <carousel-edit :imageList="guanyinList" :type="2"></carousel-edit>
    </div>

    <!-- 观音法界页面单体项目编辑 -->
    <div class="culture-edit-box anchor-class">
      <p class="title">观音法界单体项目模块</p>
      <p class="tips">该模块</p>
      <module-edit
        :anchor="'anchor-class'"
        :disabled="gyDisabled"
        :inputMaxRows="7"
        :moduleList="guanyinSingleProjectList"
        :status="gyStatus"
      ></module-edit>
    </div>

    <!-- 非物质文化遗产页面编辑 -->
    <div class="culture-edit-box anchor-class">
      <p class="title">非物质文化遗产模块</p>
      <p class="tips">非物质文化遗产页面，主要包括佛学非物质文化遗产及佛学文化日等文章描述。</p>

      <!-- 文章编辑列表 -->
      <article-edit :anchor="'anchor-class'" :articleList="articleList"></article-edit>
    </div>
  </div>
</template>

<script>
import ImageEdit from '../../components/ImageEdit'
import ArticleEdit from '../../components/ArticleEdit'
import CarouselEdit from '../../components/CarouselEdit'
import ModuleEdit from '../../components/ModuleEdit'
import config from '../../config'

export default {
  components: {
    'article-edit': ArticleEdit,
    'image-edit': ImageEdit,
    'carousel-edit': CarouselEdit,
    'module-edit': ModuleEdit
  },
  data() {
    return {
      // 文章列表
      articleList: [],
      // 展品列表
      exhibitList: [],
      // 图片可编辑列表
      imageDisabled: [],
      // 图片状态列表
      imageStatus: [],
      // 观音轮播图列表
      guanyinList: [],
      // 观音法界单体项目列表
      guanyinSingleProjectList: [],
      // 观音法界单体项目模块可编辑列表
      gyDisabled: [],
      // 观音法界单体项目模块状态列表
      gyStatus: []
    }
  },
  created() {
    this.getCulture()
    this.getExhibits()
    this.getCarousel()
  },
  methods: {
    /**
     * 获取文章
     */
    getCulture() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_CULTURE
      })
        .then(req => {
          if (req.status === 200) this.articleList = req.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取展品数据
     */
    getExhibits() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_EXHIBITS
      })
        .then(req => {
          if (req.status === 200) {
            this.exhibitList = req.data

            this.imageDisabled = new Array(this.exhibitList.length).fill(true)
            this.imageStatus = new Array(this.exhibitList.length).fill(0)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取观音法界轮播图数据
     */
    getCarousel() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_BUDDHISM_INIT
      })
        .then(req => {
          if (req.status === 200) {
            this.guanyinList = req.data.carousel
            this.guanyinSingleProjectList = req.data.others

            // 初始化编辑和状态数组
            this.gyDisabled = new Array(
              this.guanyinSingleProjectList.length
            ).fill(true)
            this.gyStatus = new Array(
              this.guanyinSingleProjectList.length
            ).fill(0)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 平滑滚动
    goAnchor(index) {
      console.log(index)
      // 顶部偏移量
      let currentTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
      // 目标距离
      let target = document.getElementsByClassName('anchor-class')[index]
        .offsetTop
      // 总偏移量 = 目标位置 - 当前位置， 正负不论
      let total = target - currentTop
      let step = 30

      clearInterval(timer)
      let timer = setInterval(() => {
        if (total >= 0) {
          if (currentTop + step >= target) {
            document.documentElement.scrollTop = target
            window.pageYOffset = target
            document.body.scrollTop = target
            clearInterval(timer)
          } else {
            document.documentElement.scrollTop += step
            window.pageYOffset += step
            document.body.scrollTop += step
            currentTop += step
          }
        } else if (total < 0) {
          if (currentTop - step <= target) {
            document.documentElement.scrollTop = target
            window.pageYOffset = target
            document.body.scrollTop = target
            clearInterval(timer)
          } else {
            document.documentElement.scrollTop -= step
            window.pageYOffset -= step
            document.body.scrollTop -= step
            currentTop -= step
          }
        }
      }, 1)
    }
  }
}
</script>

<style lang="stylus">
// 全局属性，右侧快速导航
#right_menu
  width 200px
  max-height 600px
  overflow-y auto
  position fixed
  right 20px
  top 110px
  color #909399
  font-size 0.8rem

  p
    padding 10px 0 10px 15px
    font-size 1rem
    margin 0

  li
    padding 2px 0 2px 30px
    list-style none

  li, p
    border-left 2px solid #909399

    &:hover
      border-left 2px solid #409EFF
      color #409EFF

#culture_edit
  .title
    font-size 1.5rem
    font-weight 600
    margin 0

  .tips
    font-size 0.9rem
    color #909399

  .culture-edit-box
    background #fff
    padding 50px
    margin-bottom 20px
</style>
