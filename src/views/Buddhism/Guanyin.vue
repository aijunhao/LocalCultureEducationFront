<template>
  <div id="guanyin" ref="guanyin">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buddhism/culturehome'}">佛国文化</el-breadcrumb-item>
      <el-breadcrumb-item>观音法界</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 轮播图 -->
    <divider :title="'观音法界'" :icon="'iconlianhuachan'"></divider>
    <carousel :imgList="imgList" :showIndicator="'none'"></carousel>

    <!-- 整体规划 -->
    <divider :title="'观音法界项目整体规划'"></divider>
    <div
      class="content"
      v-html="articleList[0].content"
      v-if="articleList && articleList.length != 0"
    ></div>

    <!-- 总体构想 -->
    <div class="guanyin-main" v-if="articleList && articleList.length != 0">
      <div>
        <p class="title" v-text="articleList[1].title"></p>
        <p class="content" v-html="articleList[1].content"></p>
      </div>
    </div>

    <!-- 分隔线 -->
    <divider :icon="'iconchancha'" :position="'center'" :title="'观音法界单体项目'"></divider>

    <!-- 单体项目 -->
    <div
      :key="i"
      class="guanyin-item"
      v-for="(item, i) in projectList"
      v-if="projectList && projectList.length != 0"
    >
      <div>
        <p class="title">{{ item.title }}</p>
        <p class="content">{{ item.content }}</p>
      </div>
      <img :src="item.url" alt />
    </div>
  </div>

  <!-- 整体规划 -->
</template>

<script>
import config from '../../config'
import carousel from '../../components/Carousel'
import divider from '../../components/Divider'

export default {
  components: {
    carousel,
    divider
  },
  data() {
    return {
      imgList: '',
      projectList: '',
      articleList: ''
    }
  },
  methods: {
    /**
     * 获取观音法界轮播图数据
     */
    getCarousel() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_GUANYIN_CAROUSEL
      })
        .then(req => {
          if (req.data) {
            // console.log(req.data)
            this.imgList = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取观音法界单体项目数据
     */
    getProject() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_GUANYIN_PROJECT
      })
        .then(req => {
          if (req.data) {
            // console.log(req.data)
            this.projectList = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取观音法界文章
     */
    getArticle() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_GUANYIN_ARTICLE
      })
        .then(req => {
          if (req.data) {
            // console.log(req.data)
            this.articleList = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getCarousel()
    this.getProject()
    this.getArticle()
  }
}
</script>

<style lang="stylus">
#guanyin
  .title
    font-family '华文行楷'

  .content
    text-indent 2rem

  .guanyin-main
    background url('http://120.79.254.54:3004/public/images/观音法界.jpg')
    background-repeat no-repeat
    background-size cover

    div
      background rgba(255, 255, 255, 0.6)

@media screen and (min-width: 960px)
  #guanyin
    padding 20px 15%

    .title
      font-size 1.5rem

    .content
      font-size 1rem

    .guanyin-main
      margin 20px 0
      padding 20px

      div
        width 50%
        border-radius 10px
        padding 20px

        p:nth-child(2)
          font-size 0.9rem
          -webkit-line-clamp 13
          display -webkit-box
          overflow hidden
          -webkit-box-orient vertical

    .guanyin-item
      display flex
      display -webkit-flex
      justify-content space-between
      margin 30px 0
      max-height 380px
      overflow hidden
      

      &:nth-child(even)
        flex-direction row-reverse

      div
        width 50%
        padding 20px
        overflow-y auto 

      img
        width 45%

@media screen and (max-width: 960px)
  #guanyin
    padding 10px

    .title
      font-size 1.2rem

    .content
      font-size 0.8rem

    .guanyin-logo
      height 50px

    .guanyin-main
      margin 10px 0

      div
        padding 10px

    .guanyin-item
      margin 10px 0

      img
        width 100%
</style>
