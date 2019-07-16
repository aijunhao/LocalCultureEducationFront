// 佛教文化
<template>
  <div id="buddhism">
    <!-- 侧边栏 -->
    <el-container>
      <el-aside class="buddhism-aside">
        <el-menu :default-openeds="['1', '2', '3']">
          <el-submenu index="1">
            <template slot="title">海天佛国</template>
            <el-menu-item index="1-1" @click="$router.push({path: '/buddhism/buddhismhome'})">首页</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">山水人文</template>
            <el-menu-item index="2-1">
              <a href="https://i.svrvr.com/?a=wapview&id=s62806" target="_blank">全山寺院 VR 全景</a>
            </el-menu-item>
            <el-menu-item index="2-2" @click="$router.push({path: '/buddhism/building'})">寺院庵堂</el-menu-item>
            <el-menu-item index="2-3" @click="$router.push({path: '/buddhism/scenery'})">普陀山风光</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">佛国文化</template>
            <el-menu-item index="3-1" @click="$router.push({path: '/buddhism/museum'})">佛国馆藏</el-menu-item>
            <el-menu-item index="3-2" @click="$router.push({path: '/buddhism/guanyin'})">观音法界</el-menu-item>
            <el-menu-item index="3-3" @click="$router.push({path: '/buddhism/history'})">佛国编年史</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!-- 主体内容显示区 -->
      <el-main class="buddhism-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="stylus">
#buddhism
  .buddhism-aside
    background #f2f2f2
    width 200px !important

@media screen and (min-width 960px)
  #buddhism
    padding 0 10% 

    .buddhism-aside
    //   position fixed
      margin-top 20px

    // .buddhism-main
    //   margin-left 200px

@media screen and (max-width 960px)
  #buddhism
    padding 0
</style>
