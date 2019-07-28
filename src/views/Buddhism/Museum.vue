<template>
  <div id="museum">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buddhism/culturehome'}">佛国文化</el-breadcrumb-item>
      <el-breadcrumb-item>佛学馆藏</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="museum">
      <p class="title">普陀山佛教博物馆</p>
      <div>
        <img alt src="http://120.79.254.54:3004/public/images/museum.jpg" />
        <p
          class="content indent"
        >普陀山佛教博物馆是迄今为止我国宗教界自办的首个宗教博物馆，前身是设在普济寺的文物陈列室。是一所以收藏、保护、展示和研究普陀山佛教文物为主要内容的专题性博物馆。佛教博物馆位于普陀山香华街36-6号原昙花庵遗址，与国家的文保单位元代多宝塔、省级文保单位普济禅寺、市级文保单位百子堂相毗邻，外观为仿宋风格，建筑面积3643平方米，占地面积3400平方米，总高度19.68米；分上下两层，7个展厅，馆内珍藏佛教文物1700余件，主要为佛教圣物、圣旨、钦赐袈裟、字画、瓷器、铜器佛像和玉器杂件等，其中国家一级文物5件、二级文物22件、三级文物349件。</p>
      </div>
    </div>

    <p class="subtitle">部分展品</p>
    <!-- 水平滚动图片 -->
    <horizontal-image-list :height="150" :imageList="exhibitList" :width="200"></horizontal-image-list>

    <!-- 文章 -->
    <div class="museum-article">
      <p class="subtitle">文章描述</p>
      <p class="museum-article-title">{{ museumArticle.title }}</p>
      <p class="museum-article-subtitle">
        <span>转载：{{ museumArticle.subtitle }}</span>
        <span>作者：{{ museumArticle.author }}</span>
      </p>
      <div class="indent" v-html="museumArticle.content"></div>
    </div>
  </div>
</template>

<script>
import HorizontalImageList from '../../components/HorizontalImageList'
import config from '../../config'

export default {
  components: {
    'horizontal-image-list': HorizontalImageList
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
      museumArticle: '',
      // 选中展品项序号
      index: 0
    }
  },
  created() {
    this.getExhibits()
    this.getMuseumArticle()
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
            this.museumArticle = req.data
            console.log(req.data)
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
        .then(data => {
          // console.log(data.data)
          if (data.data) this.exhibitList = data.data
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
      margin 5px 0

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

    .museum-article
      margin-top 40px

      .museum-article-title
        font-size 2rem

@media screen and (max-width: 960px)
  #museum
    padding 10px
    font-size 0.8rem

    .title
      font-size 1.5rem
      margin 5px 0

    .subtitle
      font-size 1rem
      margin 5px 0

    .museum
      margin-bottom 20px

      img
        width 100%

    .museum-article
      margin-top 20px

      .museum-article-title
        font-size 1.5rem

      img
        width calc(100% - 4rem)
</style>
