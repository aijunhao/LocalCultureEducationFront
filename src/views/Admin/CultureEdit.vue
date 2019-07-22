<template>
  <div id="culture_edit">
    <!-- 博物馆页面编辑 -->
    <div class="culture-edit-box">
      <p class="title">博物馆模块</p>
      <p class="tips">博物馆模块页面，主要包括博物馆介绍及展品展示等。</p>
      
      <!-- 展品展示 -->
      <image-edit :exhibitList="exhibitList" ></image-edit>
    </div>

    <!-- 非物质文化遗产页面编辑 -->
    <div class="culture-edit-box">
      <p class="title">非物质文化遗产文章管理</p>
      <p class="tips">非物质文化遗产页面，主要包括佛学非物质文化遗产及佛学文化日等文章描述。</p>

      <!-- 文章编辑列表 -->
      <article-edit :articleList="articleList"></article-edit>

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
          // console.log(req.data)
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
          // console.log(req.data)
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
    }
  },
  created() {
    this.getCulture()
    this.getExhibits()
  }
}
</script>

<style lang="stylus">
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
