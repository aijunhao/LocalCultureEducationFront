<template>
  <div id="article_edit">
    <div class="article-box" v-for="(article, i) in articleList" :class="anchor">
      <div class="article-edit-content">
        <p>
          <span class="article-edit-title">标题：</span>
          {{ article.title }}
        </p>
        <p>
          <span class="article-edit-title">副标题：</span>
          {{ article.subtitle }}
        </p>
        <p class="article-author-and-time">
          <span>
            <span class="article-edit-title">作者：</span>
            {{ article.author }}
          </span>
          <span>
            <span class="article-edit-title">发布时间：</span>
            {{ article.time | dataFormat() }}
          </span>
        </p>
        <p class="article-edit-overview">
          <span class="article-edit-title">总览：</span>
          {{ article.overview }}
        </p>
      </div>

      <!-- 按钮 -->
      <div class="article-edit-button">

          <el-button
            @click="$router.push({name: 'ArticleInfoEdit', params: {article: article}})"
            circle
            icon="el-icon-edit"
            type="primary"
          ></el-button>

          <el-button @click="deleteArticle(article.id)" circle icon="el-icon-delete" type="danger"></el-button>

      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  props: ['articleList', 'anchor'],
  methods: {
    deleteArticle(id) {
      console.log(id)
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_DELETE_ARTICLE + `/${id}`
      })
        .then(req => {
          console.log(req)
          if (req.status == 200) {
            this.articleList.splice(this.articleList.length - 1, 1)
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
#article_edit
  .article-box
    display flex
    display -webkit-flex
    justify-content space-between
    border-bottom 1px solid black
    padding 30px 0

    .article-edit-content
      margin-right 50px

      .article-edit-title
        font-weight 600

      .article-author-and-time
        display flex
        display -webkit-flex
        justify-content space-between

    .article-edit-button
      padding-top 50px
      display block

      button
        margin 10px
</style>

