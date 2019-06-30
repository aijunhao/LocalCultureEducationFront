<template>
  <div id="society">
    <!-- 导航 -->
    <ul id="society-menu">
      <router-link tag="li" to="/society/buddhism">海天佛国</router-link>
      <router-link tag="li" to="/society/fishery">舟山渔文化</router-link>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
#society
  margin 100px 50px

#society-menu
  list-style none
  display flex
  padding 0
  background #fff
  border-radius 5px

  li 
    border 2px solid #fff0
    margin 5px 0
    padding 5px
    font-size 1.2rem
    width 150px
    text-align center
    line-height 30px

  li:hover
    border-bottom 2px solid #409EFF
    color #409EFF
</style>
