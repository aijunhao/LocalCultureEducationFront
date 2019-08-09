<template>
  <div id="app">
    <!-- 头部 -->
    <div class="app-header" id="header">
      <!-- logo -->
      <img
        @click="$router.push('/home')"
        alt="putuoshan.png"
        class="app-logo"
        src="./assets/putuoshan.png"
      />

      <!-- 列表按钮，是否显示 -->
      <label for="menu-checkbox">
        <i class="myicons iconcaidan app-menu-button"></i>
      </label>
      <input checked id="menu-checkbox" type="checkbox" />

      <!-- 菜单 -->
      <div class="app-menu">
        <router-link tag="li" to="/home">首页</router-link>
        <router-link tag="li" to="/location">地理环境</router-link>
        <div class="drapdown">
          <router-link class="dropbtn" tag="a" to="/buddhism/buddhismhome">
            海天佛国
            <i class="el-icon-arrow-down"></i>
          </router-link>
          <div class="dropdown-content">
            <a href="https://i.svrvr.com/?a=wapview&id=s62806" target="_blank">
              <i class="myicons iconVRquanjingtu"></i>&nbspVR全景逛普陀
            </a>
            <router-link tag="a" to="/buddhism/building">
              <i class="myicons iconsimiao"></i>&nbsp寺庙庵堂
            </router-link>
            <router-link tag="a" to="/buddhism/scenery">
              <i class="myicons iconshanshui"></i>&nbsp普陀山水
            </router-link>
          </div>
        </div>
        <div class="drapdown">
          <router-link class="dropbtn" tag="a" to="/buddhism/culturehome">
            佛学文化
            <i class="el-icon-arrow-down"></i>
          </router-link>
          <div class="dropdown-content">
            <router-link tag="a" to="/buddhism/museum">
              <i class="myicons iconbowuguan"></i>&nbsp佛国馆藏
            </router-link>
            <router-link tag="a" to="/buddhism/guanyin">
              <i class="myicons iconlianhuachan"></i>&nbsp观音法界
            </router-link>
            <router-link tag="a" to="/buddhism/culture">
              <i class="myicons iconyichanjicheng"></i>&nbsp非物质文化遗产
            </router-link>
          </div>
        </div>
        <div class="drapdown">
          <router-link class="dropbtn" tag="a" to="/buddhism/HistoryHome">
            佛国编年史
            <i class="el-icon-arrow-down"></i>
          </router-link>
          <div class="dropdown-content">
            <router-link tag="a" to="/buddhism/history">
              <i class="myicons iconhistory"></i>&nbsp普陀佛史
            </router-link>
            <router-link tag="a" to="/buddhism/monk">
              <i class="myicons iconchancha"></i>&nbsp历代高僧
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- 用户 -->
    <div id="link_button">
      <!-- 未登录 -->
      <div v-show="!isLogin">
        <el-dropdown @command="handleCommand">
          <div class="user">
            <i class="myicons iconuser"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>当前未登录</el-dropdown-item>
            <el-dropdown-item command="Login" divided>登录</el-dropdown-item>
            <el-dropdown-item command="Register">注册</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div v-show="isLogin">
        <!-- 已登录 -->
        <el-dropdown @command="handleCommand">
          <div class="user">
            <img :src="user.portrait" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>用户名：{{ user.nickname }}</el-dropdown-item>
            <el-dropdown-item disabled>用户权限：{{ user.powername }}</el-dropdown-item>
            <el-dropdown-item command="UserHome" divided>用户中心</el-dropdown-item>
            <el-dropdown-item command="admin" v-show="user.power > 5">控制台</el-dropdown-item>
            <el-dropdown-item command="logout" divided icon="el-icon-circle-check">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <!-- 主体 -->
    <router-view class="app-main"></router-view>

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
          <router-link tag="p" to="/home">首页</router-link>
          <router-link tag="p" to="/location">地理环境</router-link>
          <router-link tag="p" to="/buddhism/buddhismhome">海天佛国</router-link>
          <router-link tag="p" to="/buddhism/culturehome">佛学文化</router-link>
          <router-link tag="p" to="/buddhism/history">佛国编年史</router-link>
          <router-link tag="p" to="/admin">管理员页面</router-link>
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

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState(['user']),
    ...mapGetters(['isLogin'])
  },
  methods: {
    handleCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch('logout')
        this.$message({
          message: '您已安全退出!',
          type: 'success'
        })
        this.$router.push({ name: 'home' })
      } else {
        this.$router.push({ name: command })
      }
    }
  }
}
</script>


<style lang="stylus">
// 布局
flex($h = flex-start, $v = flex-start, $w = nowrap)
  display flex
  display -webkit-flex
  align-items $v
  flex-wrap $w
  justify-content $h

#menu-checkbox
  display none

#link_button
  position fixed
  top 130px
  right 50px
  z-index 50

  .user
    width 48px
    height 48px
    border-radius 50%
    overflow hidden
    background #fff
    text-align center
    box-shadow 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)

    img
      width 100%
      height 100%

    .myicons
      font-size 24px
      line-height 48px

#app
  .app-header
    width 100%
    background rgba(255, 255, 255, 0.8)
    // 设置浮动在固定位置，层级在上
    position fixed
    top 0
    z-index 100

    // 菜单按钮
    .app-menu-button
      float right
      margin-right 10px
      font-size 3rem !important
      line-height 70px

    .app-menu
      li
        list-style none

      a
        text-decoration none

      li, a
        display block
        color black
        font-size 1rem

        &:hover
          background #DCDFE6

      .drapdown:hover .dropdown-content
        display block

  .footer
    background #000
    margin-top 50px
    color #fff
    padding 20px 0

    >p
      text-align center

    ul
      padding 0
      list-style none

      li
        padding 0 15px
        font-size 0.8rem

        p:first-child
          font-weight 600
          font-size 1.2rem

        .footer-subtitle
          font-weight 600
          font-size 1rem

@media screen and (min-width: 960px)
  $header-height = 80px

  #app
    .app-header
      flex(space-between, center)

      .app-logo
        height $header-height - 10px
        margin-left 50px

      // 菜单按钮
      .app-menu-button
        display none

      .app-menu
        flex()
        margin-right 50px

        li, .dropbtn
          text-align center
          line-height $header-height
          width 130px

        .dropdown-content
          position absolute
          background rgba(255, 255, 255, 0.8)
          display none

          a
            box-sizing border-box
            text-align left
            padding 12px 16px
            min-width 170px

    .app-main
      margin-top $header-height
      min-height 650px

    .footer
      ul
        display flex
        margin 0 15%

        li
          width 25%

@media screen and (max-width: 960px)
  $header-height = 70px

  #menu-checkbox:checked ~ .app-menu
    display none

  #app
    .app-header
      height $header-height

      .app-logo
        height $header-height - 10px
        margin 5px 10px

      .app-menu
        background #fff

        li, .drapdown
          border 1px solid #000
          border-radius 5px
          padding 5px 10px
          margin-bottom 5px

        .dropdown-content
          a
            padding-left 30px
            line-height 35px

    .app-main
      margin-top $header-height

    .footer
      >p:last-child
        margin-bottom 0
        font-size 0.8rem

      ul
        li
          text-align center
          padding 5px
</style>