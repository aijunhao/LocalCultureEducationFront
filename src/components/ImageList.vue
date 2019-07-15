<template>
  <div id="image_list">
    <p>{{ title }}</p>
    <ul>
      <li :key="i" @click="getImageInfo(item.id)" v-for="(item, i) in imageList">
        <el-image :src="item.img" fit="fill"></el-image>
        <div class="description">
          <p>{{ item.title }}</p>
          <div>
            <span>
              <i class="el-icon-view"></i>
              {{ item.lookedNumber }}
            </span>
            <span>
              <i class="el-icon-chat-dot-round"></i>
              {{ item.commentNumber }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import config from '../config.js'

export default {
  props: ['imageList', 'title'],
  methods: {
    /**
     * 图片点击
     */
    getImageInfo(id) {
      // 将图片 id 传给 vuex 进行 vuex 存储和 sessionStore 存储
      this.$store.dispatch('imageInfoId', id)
      // 路由跳转
      this.$router.push({ name: 'imageinfo' })
    }
  }
}
</script>

<style lang="stylus">
#image_list
  >p
    font-weight 600
    font-size 1.2rem

  ul
    list-style none
    padding 0
    margin 0

    .el-image
      width 100%
      height 100%
      min-height 150px

    li
      border-radius 5px
      overflow hidden
      position relative
      background #fff

      .description
        min-height 50px
        background rgba(144, 147, 153, 0.8)
        box-sizing border-box
        width 100%
        padding 10px
        position absolute
        bottom 0

        >p
          width 100%
          text-overflow ellipsis
          overflow hidden
          white-space nowrap
          margin 0 0 5px
          min-height 22px

        >div
          display flex
          display -webkit-flex
          justify-content space-around

@media screen and (min-width: 960px)
  #image_list
    ul
      display flex
      display -webkit-flex
      justify-content flex-start
      flex-wrap wrap

      li
        margin 5px
        width calc((100% / 3) - 10px)

@media screen and (max-width: 960px)
  #image_list
    li
      margin 10px
</style>