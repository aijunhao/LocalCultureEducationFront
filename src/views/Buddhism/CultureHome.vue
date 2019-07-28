<template>
  <div id="culturehome">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item>佛国文化</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 介绍文字 -->
    <div class="culturehome-overview">这里预计需要一段全局介绍</div>

    <div :key="i" v-for="(item, i) in cultureHomeContent">
      <div class="culturehome-link">
        <i :class="['myicons', 'icons-big', item.icon]"></i>
        <span v-text="item.module_name"></span>
        <p @click="$router.push({name: item.target})">
          更多
          <i class="myicons icondouble-up"></i>
        </p>
      </div>
      <div :class="['culturehome-box', i % 2 ? 'direction' : '']">
        <img :src="item.url" />
        <div>
          <p class="title" v-text="item.title"></p>
          <p class="content" v-text="item.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../config'

export default {
  data() {
    return {
      cultureHomeContent: ''
    }
  },
  methods: {
    /**
     * 获取内容
     */
    getCultureHomeContent() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_CULTURE_HOME
      })
        .then(req => {
          if (req.status === 200) this.cultureHomeContent = req.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getCultureHomeContent()
  }
}
</script>


<style lang="stylus">
#culturehome
  .culturehome-link
    display flex
    display -webkit-flex
    justify-content space-between
    align-items center
    margin 5px 0 5px 10px
    font-family '华文行楷'

    p
      margin 0
      width calc(100% - 150px)
      line-height 32px
      text-align right
      border-bottom 2px solid black

  .icons-big
    font-size 32px

  .title
    text-align center
    font-family '微软雅黑'

  .content
    text-indent 2rem
    -webkit-line-clamp 10
    display -webkit-box
    overflow hidden
    -webkit-box-orient vertical

  .culturehome-overview
    height 300px
    background #ffffff
    margin-bottom 20px

  .culturehome-box
    margin-bottom 20px

@media screen and (min-width: 960px)
  #culturehome
    padding 20px 15%

    .title
      font-size 2rem
      margin 10px

    .content
      font-size 1rem

    .direction
      flex-direction row-reverse

    .culturehome-box
      display flex
      display -webkit-flex
      justify-content space-between
      margin-bottom 20px
      height 300px

      div
        box-sizing border-box
        width 45%
        padding 10px

      img
        width 50%

@media screen and (max-width: 960px)
  #culturehome
    padding 10px

    .title
      font-size 1.5rem
      margin 10px

    .content
      font-size 0.8rem

    .culturehome-box
      margin-bottom 10px

      div
        padding 10px

      img
        width 100%
        height @width * 0.8
</style>
