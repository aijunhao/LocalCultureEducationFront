<template>
  <div id="historyhome">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item>普陀编年史</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 介绍文字 -->
    <div class="historyhome-overview">这里预计需要一段全局介绍</div>

    <!-- 普陀佛史 -->
    <div>
      <div class="historyhome-link">
        <i class="myicons iconhistory icons-big"></i>
        <span>普陀佛史</span>
        <p @click="$router.push({name: 'History'})">
          更多
          <i class="myicons icondouble-up"></i>
        </p>
      </div>
      <div>普陀佛史</div>
    </div>

    <!-- 历代高僧 -->
    <div>
      <div class="historyhome-link">
        <i class="myicons iconchancha icons-big"></i>
        <span>历代高僧</span>
        <p @click="$router.push({name: 'Monk'})">
          更多
          <i class="myicons icondouble-up"></i>
        </p>
      </div>
      <div>历代高僧</div>
    </div>
  </div>
</template>

<style lang="stylus">
#historyhome
  .historyhome-link
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

  .historyhome-overview
    height 300px
    background #ffffff
    margin-bottom 20px

@media screen and (min-width: 960px)
  #historyhome
    padding 20px 15%
</style>
