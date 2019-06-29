<template>
  <div id="app">
    <!-- 头部 -->
    <div class="app-header">
      <!-- logo -->
      <img alt="myLogo.png" class="app-logo" src="./assets/myLogo.png">
      <!-- 菜单 -->
      <ul class="app-menu">
        <router-link tag="li" to="/home">首页</router-link>
        <router-link tag="li" to="/location">位置介绍</router-link>
        <router-link tag="li" to="/society">人文社会</router-link>
        <router-link tag="li" to="/nature">自然风景</router-link>
        <router-link tag="li" to="/history">历史背景</router-link>
      </ul>
    </div>
    <!-- 主体 -->
    <router-view></router-view>
  </div>
</template>

<style lang="stylus">
#app
  .app-header
    // 布局
    display flex
    display -webkit-flex
    justify-content space-between
    align-items center
    width 100%
    top 10px
    // 设置浮动在固定位置，层级在上
    position fixed
    z-index 100
    // 备用颜色
    background #fff

    .app-logo
      width 200px
      margin-left 50px

    .app-menu
      list-style none
      display flex
      margin-right 10px

      >li
        width 100px
        text-align center
        color #000
        font-size 1rem
        border 2px solid #fff0
        border-radius 5px
        padding 5px
        margin 5px
        font-weight 600

      >li:hover
        border 2px solid #000
</style>