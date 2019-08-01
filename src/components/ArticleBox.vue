<template>
  <div id="article_box">
    <div :class="anchor" :id="idName + '_' + i" :key="i" v-for="(article, i) in articleList">
      <!-- 标题信息 -->
      <p class="article-box-title" v-text="article.title "></p>
      <p class="article-box-subtitle" v-text="article.subtitle"></p>
      <p class="article-box-others">
        <span>
          发布者：
          <span v-text="article.author"></span>
        </span>
        <span>
          来源：
          <span v-text="article.source"></span>
        </span>
        <span>
          发布时间：
          <span v-text="$options.filters.dataFormat(article.time)"></span>
        </span>
      </p>
      <hr />

      <!-- 内容文本 -->
      <div class="article-box-content" v-html="article.content"></div>

      <!-- 分割线 -->
      <el-divider>
        <i :class="setClass(i)"></i>
      </el-divider>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    articleList: {
      type: Array,
      require: true
    },
    // 锚点类
    anchor: String,
    // ID
    idName: String
  },
  data() {
    return {
      // 分割线类名
      type: ['iconfojing', 'iconfoshou', 'iconfo', 'iconfozhu']
    }
  },
  methods: {
    /**
     * 动态设置类
     */
    setClass(index) {
      return ['myicons', this.type[index % this.type.length]]
    }
  }
}
</script>

<style lang="stylus">
#article_box
  .el-divider__text
    background-color #f2f2f2

  .el-divider--horizontal
    margin 40px 0

  .myicons
    font-size 2rem

  .article-box-title
    font-family '华文行楷'
    text-align center

  .article-box-others
    // color #909399
    display -webkit-flex
    display flex
    justify-content space-around

  .article-box-subtitle
    text-align right
    font-weight 600

  .article-box-content
    p
      text-indent 2rem

    img
      width 60%

@media screen and (min-width: 960px)
  #article_box
    .article-box-title
      font-size 2rem
      margin 20px 0

@media screen and (max-width: 960px)
  #article_box
    font-size 0.8rem

    .article-box-title
      font-size 1.5rem
      margin 10px 0

    .article-box-subtitle
      font-size 0.8rem
      margin 10px 0

    .article-box-others
      font-size 0.6rem

    .article-box-content
      img
        width calc(100% - 4rem)
</style>
