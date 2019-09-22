<template>
  <div id="admin">
    <el-container>
      <!-- 头部 -->
      <el-header id="admin_header">
        <!-- 头像 -->
        <div></div>
        <div>佛缘普陀 管理员控制台</div>
        <div @click="$router.push('/home')">返回网页</div>
      </el-header>

      <!-- 主体 -->
      <el-container id="admin_container">
        <!-- 左侧导航 -->
        <div>
          <div @click="changeAside()" class="aside-button">
            <i class="el-icon-arrow-right" v-if="isCollapse"></i>
            <i class="el-icon-arrow-left" v-else></i>
          </div>
          <el-menu :collapse="isCollapse" class="el-menu-vertical-demo" default-active="1">
            <!-- 总览 -->
            <el-submenu index="1">
              <template slot="title">
                <i class="myicons iconzonglan"></i>
                <span class="title" slot="title">总览</span>
              </template>
              <el-menu-item-group>
                <el-menu-item @click="$router.push({name: 'Overview'})" index="1-1">总览</el-menu-item>
              </el-menu-item-group>
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
          <!-- <div id="link-slot">
          </div>-->
        </div>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 展开收起状态
      isCollapse: true
    }
  },
  mounted() {
    document.getElementById('header').style.display = 'none'
  },
  beforeDestroy() {
    document.getElementById('header').style.display = 'flex'
  },
  methods: {
    changeAside() {
      this.isCollapse = !this.isCollapse
    }
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

  .portrait
    width 50px
    height 50px
    background #fff
    border-radius 50%

#admin_container
  margin 110px 30px

  .el-menu-vertical-demo:not(.el-menu--collapse)
    width 200px

  .myicons
    font-size 24px

  .title
    margin-left 10px

  .aside-button
    width 64px
    height 64px
    line-height 64px
    background #fff
    text-align center
    margin-bottom 5px

  .admin-main
    margin-left 30px
    margin-right 220px
    width 100%
</style>