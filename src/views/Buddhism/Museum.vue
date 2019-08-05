<template>
  <div id="museum">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buddhism/culturehome'}">佛国文化</el-breadcrumb-item>
      <el-breadcrumb-item>佛学馆藏</el-breadcrumb-item>
    </el-breadcrumb>

    <divider :icon="'iconbowuguan'" :title="'普陀山佛教博物馆'"></divider>
    <div class="museum" v-if="museumInfo && museumInfo.length != 0">
      <!-- <p class="title" v-text="museumInfo[0].title">普陀山佛教博物馆</p> -->
      <div>
        <img :src="museumInfo[0].url" alt />
        <p class="content indent" v-text="museumInfo[0].content"></p>
      </div>
    </div>

    <!-- 展品 -->
    <divider :icon="'iconzhuantituji'" :title="'部分展品'"></divider>
    <horizontal-image-list :height="150" :imageList="exhibitList" :width="200"></horizontal-image-list>

    <!-- 文章 -->
    <divider :icon="'iconwenzhang'" :title="'文章描述'"></divider>
    <article-box :articleList="museumArticleList"></article-box>
  </div>
</template>

<script>
import HorizontalImageList from '../../components/HorizontalImageList'
import ArticleBox from '../../components/ArticleBox'
import divider from '../../components/Divider'
import config from '../../config'

export default {
  components: {
    'horizontal-image-list': HorizontalImageList,
    'article-box': ArticleBox,
    divider
  },
  data() {
    return {
      // 展品数据列表
      exhibitList: [
        {
          title: '',
          img: '',
          content: '数据丢失了，请稍后再试！'
        }
      ],
      // 博物馆信息
      museumInfo: [],
      // 文章列表
      museumArticleList: [],
      // 选中展品项序号
      index: 0
    }
  },
  created() {
    this.getExhibits()
    this.getMuseumArticle()
    this.getMuseumInfo()
  },
  methods: {
    /**
     * 获取博物馆文章
     */
    getMuseumArticle() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_MUSEUM_ARTICLE
      })
        .then(req => {
          if (req.status === 200) {
            this.museumArticleList = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取博物馆文章
     */
    getMuseumInfo() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_BUILDING_MUSEUM_INFO
      })
        .then(req => {
          if (req.status === 200) {
            console.log(req.data)
            this.museumInfo = req.data
          }
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
          if (req.status === 200) this.exhibitList = req.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus">
#museum
  .museum-button
    display flex
    display -webkit-flex
    justify-content space-between
    user-select none

  .title, .subtitle
    font-family '华文行楷'

  .indent
    text-indent 2rem

  .museum
    div
      p
        margin 0
        padding 10px

  .museum-article
    .museum-article-title
      font-family '华文行楷'
      text-align center
      margin 10px 0

    .museum-article-subtitle
      font-weight 600
      display -webkit-flex
      display flex
      justify-content space-around

@media screen and (min-width: 960px)
  #museum
    padding 20px 15%

    .title
      font-size 2rem
      margin 10px 0

    .subtitle
      font-size 1.2rem

    .museum
      margin-bottom 40px

      div
        display flex
        display -webkit-flex
        justify-content space-between
        height 250px

        p
          width 45%

        img
          width 50%

@media screen and (max-width: 960px)
  #museum
    padding 10px
    font-size 0.8rem

    .title
      font-size 1.5rem
      margin 5px 0

    .subtitle
      font-size 1rem

    .museum
      margin-bottom 20px

      img
        width 100%
</style>
