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

      <p @click="goAnchor(1 + exhibitList.length)">非物质文化遗产模块</p>
      <ul>
        <li
          :key="i"
          @click="goAnchor(2 + exhibitList.length + i)"
          v-for="(article, i) in articleList"
        >{{ article.title }}</li>
      </ul>
    </div>

    <!-- 博物馆页面编辑 -->
    <div class="culture-edit-box anchor-class" id="cluture_museum">
      <p class="title">博物馆模块</p>
      <p class="tips">博物馆模块页面，主要包括博物馆介绍及展品展示等。</p>

      <!-- 展品展示 -->
      <image-edit :anchor="'anchor-class'" :exhibitList="exhibitList"></image-edit>
    </div>

    <!-- 非物质文化遗产页面编辑 -->
    <div class="culture-edit-box anchor-class" id="cultural_heritage">
      <p class="title">非物质文化遗产模块</p>
      <p class="tips">非物质文化遗产页面，主要包括佛学非物质文化遗产及佛学文化日等文章描述。</p>

      <!-- 文章编辑列表 -->
      <article-edit :anchor="'anchor-class'" :articleList="articleList"></article-edit>

      <div class="culture-article-more">
        <p class="tips">创建文章</p>
        <!-- 创建按钮 -->
        <el-button @click="newArticle()" circle icon="el-icon-plus" type="success"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import ImageEdit from '../../components/ImageEdit'
import QuillEditor from '../../components/QuillEditor'
import ArticleEdit from '../../components/ArticleEdit'
import config from '../../config'

export default {
  components: {
    'quill-editor': QuillEditor,
    'article-edit': ArticleEdit,
    'image-edit': ImageEdit
  },
  data() {
    return {
      articleList: [],
      exhibitList: [],
      article: {
        id: '',
        title: '',
        subtitle: '',
        time: '',
        author: '',
        content: '',
        overview: ''
      }
    }
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
          if (req.data) this.exhibitList = req.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 创建文章
     */
    newArticle() {
      this.$router.push({
        name: 'ArticleInfoEdit',
        params: { article: this.article }
      })
    },
    // 平滑滚动
    goAnchor(index) {
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
  },
  created() {
    this.getCulture()
    this.getExhibits()
  },
  watch: {}
}
</script>

<style lang="stylus">
// 全局属性，右侧快速导航
#right_menu
  width 200px
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

    .culture-article-more
      margin-top 20px
      display flex
      display -webkit-flex
      justify-content flex-end
      align-items center

      button
        margin 0 10px

</style>
