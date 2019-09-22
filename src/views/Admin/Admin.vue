<template>
  <div id="admin">
    <el-container>
      <!-- 头部 -->
      <el-header id="admin_header">
        <!-- 头像 -->
        <div>佛缘普陀</div>
        <div>
          <p class="title">管理员控制台</p>
        </div>
        <div @click="$router.push('/home')" class="btn-text">用户页面</div>
      </el-header>

      <!-- 主体 -->
      <el-container id="admin_container" v-if="isShow">
        <!-- 左侧导航 -->
        <div id="admin_menu">
          <div @click="changeAside()" class="open-button">
            <i class="el-icon-arrow-right" v-if="isOpen"></i>
            <i class="el-icon-arrow-left" v-else></i>
          </div>
          <el-menu :collapse="isOpen" class="el-menu-vertical-demo" default-active="1">
            <!-- 总览 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="myicons iconzonglan"></i>
                <span class="title" slot="title">总览</span>
              </template>
              <el-menu-item @click="$router.push({name: 'Overview'})" index="1-1">总览</el-menu-item>
            </el-submenu>

            <!-- 页面设置 -->
            <el-submenu index="2">
              <template slot="title">
                <i class="myicons icontubiao_kuaizhuangpailie"></i>
                <span class="title" slot="title">模块</span>
              </template>
              <el-menu-item @click="$router.push({name: 'HomeEdit'})" index="2-1">首页</el-menu-item>
              <el-menu-item @click="$router.push({name: 'LocationEdit'})" index="2-2">地理环境</el-menu-item>
              <el-menu-item @click="$router.push({name: 'BuddhismEdit'})" index="2-3">海天佛国</el-menu-item>
              <el-menu-item @click="$router.push({name: 'CultureEdit'})" index="2-4">佛国文化</el-menu-item>
              <el-menu-item @click="$router.push({name: 'HistoryEdit'})" index="2-5">佛国编年史</el-menu-item>
            </el-submenu>

            <!-- 用户 -->
            <el-submenu index="3">
              <template slot="title">
                <i class="myicons iconyonghu"></i>
                <span class="title" slot="title">用户</span>
              </template>
              <el-menu-item @click="$router.push({name: 'UserEdit'})" index="3-1">用户管理</el-menu-item>
            </el-submenu>

            <!-- 社区 -->
            <el-submenu index="4">
              <template slot="title">
                <i class="myicons iconshequ"></i>
                <span class="title" slot="title">社区</span>
              </template>
              <el-menu-item @click="$router.push({name: 'CommentsEdit'})" index="4-1">评论管理</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>

        <!-- 右侧内容 -->
        <div class="admin-main">
          <router-view></router-view>
        </div>
      </el-container>

      <div id="admin_small" v-else v-text="tig"></div>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 展开收起状态
      isOpen: true,
      // 屏幕大小监测，是否正常显示
      isShow: false,
      // 屏幕过小的提醒文本
      tig: '',
      // 需要的屏幕大小
      needWidth: 960
    }
  },
  mounted() {
    document.getElementById('header').style.display = 'none'
  },
  beforeDestroy() {
    document.getElementById('header').style.display = 'flex'
  },
  methods: {
    /**
     * 修改侧边栏收缩展开
     */
    changeAside() {
      this.isOpen = !this.isOpen
    },
    /**
     * 管理员页面是否显示判定
     */
    adminIsShow() {
      let width = document.body.clientWidth
      if (width >= this.needWidth) this.isShow = true
      else this.isShow = false
      // 提示文本
      this.tig = `当前屏幕过小，建议使用宽度 ${this.needWidth}px 以上设备或尝试使用横屏访问管理员页面。`
      // console.log(width)
    }
  },
  created() {
    this.adminIsShow()
    window.addEventListener('resize', () => {
      this.adminIsShow()
    })
  }
}
</script>


<style lang="stylus">
#admin
  margin 0 !important

#admin_header
  background #B3C0D1
  height 80px !important
  display flex
  display -webkit-flex
  justify-content space-between
  align-items center
  position fixed
  width 100%
  z-index 100
  user-select none

  .btn-text:hover
    color #409EFF
    font-weight 600
    cursor pointer

  .title
    font-size 25px
    font-family '华文行楷'

#admin_container
  margin 100px 20px

  .admin-main
    margin-left 170px
    margin-right 130px
    width calc(100% - 340px)

#admin_menu
  position fixed
  z-index 100

  .el-menu-vertical-demo:not(.el-menu--collapse)
    width 150px

  .el-submenu .el-menu-item
    min-width 150px

  .myicons
    font-size 24px

  .title
    margin-left 10px

  .open-button
    width 64px
    height 64px
    line-height 64px
    background #fff
    text-align center
    margin-bottom 5px

#admin_small
  min-height 500px
  display flex
  display -webkit-flex
  justify-content center
  align-items center
  padding 30px
  text-align center
</style>