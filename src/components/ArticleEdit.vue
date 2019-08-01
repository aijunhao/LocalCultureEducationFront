<template>
  <div id="article_edit">
    <div
      :class="anchor"
      :id="idName + '_' + i"
      class="article-box"
      v-for="(article, i) in articleList"
    >
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
            <span class="article-edit-title">发布者：</span>
            {{ article.author }}
          </span>
          <span>
            <span class="article-edit-title">来源：</span>
            {{ article.source }}
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
      <div class="edit-button">
        <el-button
          @click="$router.push({name: 'ArticleInfoEdit', params: {article: article}})"
          circle
          icon="el-icon-edit"
          type="success"
        ></el-button>
        <el-button @click="deleteArticle(i)" circle icon="el-icon-delete" type="danger"></el-button>
      </div>
    </div>

    <div class="article-edit-new">
      <p class="tips">创建文章</p>
      <!-- 创建按钮 -->
      <el-button @click="newArticle()" circle icon="el-icon-plus" type="success"></el-button>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  props: {
    articleList: {
      type: Array
    },
    anchor: String,
    idName: String
  },
  data() {
    return {
      // 文章列表
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
     * 删除文章
     */
    deleteArticle(index) {
      console.log(this.articleList[index].id)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return this.$axios({
            method: 'get',
            url:
              config.EXECUTE_GET_DELETE_ARTICLE +
              `/${this.articleList[index].id}`
          })
        })
        .then(req => {
          // console.log(req)
          if (req.status == 200) {
            this.articleList.splice(index, 1)
            this.$notify({
              title: '刪除',
              message: '文章已删除成功',
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '刪除',
            message: '文章删除失败，已取消删除操作',
            type: 'success'
          })
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
  }
}
</script>

<style lang="stylus">
#article_edit
  .article-edit-new
    margin-top 20px
    display flex
    display -webkit-flex
    justify-content flex-end
    align-items center

    button
      margin 0 10px

  .article-box
    display flex
    display -webkit-flex
    justify-content space-between
    border-bottom 1px solid black
    padding 30px 0

    .article-edit-content
      margin-right 50px
      width calc(100% - 60px)

      .article-edit-title
        font-weight 600

      .article-author-and-time
        display flex
        display -webkit-flex
        justify-content space-between

    .edit-button
      padding-top 50px
      display block
      width 60px

      button
        margin 10px
</style>

