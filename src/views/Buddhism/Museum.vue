<template>
  <div id="museum">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item>佛学馆藏</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 水平滚动图片 -->
    <horizontal-image-list :height="150" :imageList="exhibitList" :width="200"></horizontal-image-list>

    <!-- 文章 -->
    <div class="museum-article">
      <p class="museum-article-title">{{ museumArticle.title }}</p>
      <p class="museum-article-subtitle">
        <span>转载：{{ museumArticle.subtitle }}</span>
        <span>作者：{{ museumArticle.author }}</span>
      </p>
      <div v-html="museumArticle.content"></div>
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
    },

    // 上一个
    pre() {
      if (this.index > 0) this.index--

      console.log(this.index)
    },
    // 下一个
    next() {
      if (this.index < this.exhibitList.length - 1) this.index++

      console.log(this.index)
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

@media screen and (min-width: 960px)
  #museum
    padding 20px 15%

    .museum-article
      .museum-article-title
        font-size 2rem
        font-family '华文行楷'
        text-align center

      .museum-article-subtitle
        font-weight 600
        display -webkit-flex
        display flex
        justify-content space-around

      p
        text-indent 2rem
        // text-align center

      img
        width 60%

@media screen and (max-width: 960px)
  $space = 10px

  #museum
    padding $space
    font-size 0.8rem
</style>
