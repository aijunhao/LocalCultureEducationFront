<template>
  <div id="app">
    <!-- 头部 -->
    <div class="app-header">
      <!-- logo -->
      <img alt="putuoshan.png" class="app-logo" src="./assets/putuoshan.png" />
      <!-- 菜单 -->
      <ul class="app-menu">
        <router-link tag="li" to="/home">首页</router-link>
        <router-link tag="li" to="/location">地理环境</router-link>
        <router-link tag="li" to="/society">人文社会</router-link>
        <router-link tag="li" to="/nature">自然风景</router-link>
        <router-link tag="li" to="/history">历史背景</router-link>
      </ul>
    </div>

    <!-- 主体 -->
    <router-view></router-view>

    <!-- 底部 -->
    <div class="footer">
      <ul>
        <li>
          <p>关于我们</p>
          <p>浙江工业大学之江学院</p>
        </li>
        <li>
          <p>联系我们</p>
          <p class="footer-subtitle">地址</p>
          <p>浙江省绍兴市柯桥区越州大道958号</p>
          <p class="footer-subtitle">联系方式</p>
          <p>电话：182-4860-2820</p>
          <p>邮箱：1172949809@qq.com</p>
        </li>
        <li>
          <p>相关连接</p>
          <p>首页</p>
          <p>地理环境</p>
          <p>人文社会</p>
          <p>自然风景</p>
          <p>历史背景</p>
          <p>团队成员</p>
        </li>
        <li>
          <p>网站描述</p>
          <p>此项目参加2019年多媒体设计竞赛，资源及内容来自互联网，如有侵权，联系删除。</p>
        </li>
      </ul>
      <p>
        <span>Design by: 艾俊豪</span>
        <span>&nbsp&nbsp</span>
        <span>备案号：浙ICP备18031478号-1</span>
      </p>
    </div>
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
    // background #fff
    .app-logo
      width 200px
      margin-left 50px

    .app-menu
      list-style none
      display flex
      margin-right 40px

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

  .footer
    background #000
    margin-top 50px
    color #fff
    padding 20px 0

    >p
      text-align center

    ul
      display flex
      padding 0
      margin 0 15%
      list-style none

      li
        width 25%
        padding 0 20px
        font-size 0.8rem

        p:first-child
          font-weight 600
          font-size 1.2rem

        .footer-subtitle
          font-weight 600
          font-size 1rem
</style>