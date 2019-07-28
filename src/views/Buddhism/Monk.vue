<template>
  <div id="monk">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buddhism/HistoryHome'}">普陀编年史</el-breadcrumb-item>
      <el-breadcrumb-item>历代高僧</el-breadcrumb-item>
    </el-breadcrumb>

    <div>高僧</div>
  </div>
</template>

<style lang="stylus">
// #monk
@media screen and (min-width: 960px)
  #monk
    padding 20px 15%

@media screen and (max-width: 960px)
  #monk
    padding 10px
</style>
