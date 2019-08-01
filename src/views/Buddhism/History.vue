<template>
  <div id="history">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buddhism/HistoryHome'}">普陀编年史</el-breadcrumb-item>
      <el-breadcrumb-item>普陀佛史</el-breadcrumb-item>
    </el-breadcrumb>

    <article-box :articleList="articleList"></article-box>
  </div>
</template>

<script>
import config from '../../config'
import ArticleBox from '../../components/ArticleBox'

export default {
  data() {
    return {
      articleList: []
    }
  },
  components: {
    'article-box': ArticleBox
  },
  created() {
    this.getHistoryArticle()
  },
  methods: {
    /**
     * 获取历史文章
     */
    getHistoryArticle() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HISTORY_ARTICLE
      })
        .then(req => {
          if (req.status === 200) {
            this.articleList = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus">
@media screen and (min-width: 960px)
  #history
    padding 20px 15%

@media screen and (max-width: 960px)
  #history
    padding 10px
</style>