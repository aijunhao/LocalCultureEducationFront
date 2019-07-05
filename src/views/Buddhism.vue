// 佛教文化
<template>
  <div id="buddhism">
    <ul class="buddhism-list">
      <li @click="$router.push({name: 'buddhismhome'})">海天佛国</li>
      <li>
        <a href="https://i.svrvr.com/?a=wapview&id=s62806" target="_blank">普陀山全山寺院 VR 全景</a>
      </li>
      <li @click="$router.push({name: 'buddhismhome'})">山水寺院</li>
      <li @click="$router.push({name: 'buddhismhome'})">佛国历史</li>
      <li @click="$router.push({name: 'buddhismhome'})">佛国馆藏</li>
      <li @click="$router.push({name: 'buddhismhome'})">历代高僧</li>
    </ul>
    <div class="buddhism-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="stylus">
#buddhism
  padding- @clickp 100px

  .buddhism-main
    padding 15px

  .buddhism-list
    list-style none
    padding 0
    margin 0

    li
      height 60px
      width 200px
      background #fff
      text-align center
      line-height 60px

    li:hover
      background #409EFF

@media screen and (min-width: 960px)
  #buddhism
    padding 100px 15%
    display flex
    display -webkit-flex

    .buddhism-main
      margin-left 30px
</style>
