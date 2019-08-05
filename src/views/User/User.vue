<template>
  <div id="user">
    <div class="user-login">
      <div class="header">
        <img alt src="../../assets/putuoshan.png" />
      </div>
      <div>
        <router-link to="/user/login">登录</router-link>
        <router-link to="/user/register">注册</router-link>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="stylus">
#user
  min-height 700px
  background url('../../assets/bgc.jpg')
  background-repeat no-repeat
  background-size cover

  .user-login
    width 400px
    height 500px
    background rgba(255, 255, 255, 0.8)
    float right
    margin 100px
    padding 20px 50px
    box-sizing border-box
    border-radius 20px

  .header
    text-align center

    img
      width 50%

  .el-form-item__label
    padding 0 !important

  .el-form-item
    margin 0 0 15px 0

  a
    margin 10px 0
    color black
    text-decoration none
    width 50%
    text-align center
    display inline-block
    background #fff
    padding 10px
    box-sizing border-box
    border-radius 10px 10px 0 0

  .router-link-active
    background #409EFF !important
</style>
