<template>
  <div id="module">
    <div class="module-link">
      <i :class="['myicons', 'icons-big', module.icon ? module.icon : '']"></i>
      <span v-text="module.module_name"></span>
      <p @click="$router.push({name: module.target})">
        更多
        <i class="myicons icondouble-up"></i>
      </p>
    </div>
    <div :class="['module-box', direction ? 'direction' : '']">
      <img :src="module.url" />
      <div>
        <p class="title" v-text="module.title"></p>
        <p class="content" v-html="module.content"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据内容
    module: {
      type: Object,
      require: true
    },
    // 是否反向
    direction: {
        type: Boolean
    }
  }
}
</script>

<style lang="stylus">
#module
  .module-link
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

  .module-box
    margin-top 10px

    .title
      text-align center
      font-family '微软雅黑'

    .content
      text-indent 2rem
      -webkit-line-clamp 10
      display -webkit-box
      overflow hidden
      -webkit-box-orient vertical

      p 
        margin 0

@media screen and (min-width: 960px)
  #module
    .direction
      flex-direction row-reverse

    .module-box
      display flex
      display -webkit-flex
      justify-content space-between
      margin-bottom 20px
      max-height 300px

      div
        box-sizing border-box
        width 50%
        padding 10px

        .title
          font-size 1.8rem
          margin 10px 0

        .content
          font-size 1rem

      img
        width 45%

@media screen and (max-width: 960px)
  #module
    .module-box
      margin-bottom 10px

      div
        padding 10px

        .title
          font-size 1.5rem
          margin 10px 0

        .content
          font-size 0.8rem

      img
        width 100%
        height @width * 0.8
</style>
