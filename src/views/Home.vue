<template>
  <div id="home">
    <!-- 轮播图 -->
    <carousel :imgList="imgList"></carousel>

    <!-- 首页简介 -->
    <div :key="i" class="home-content" v-for="(item, i) in initMessage">
      <p class="home-content-title">{{ item.moduleName }}</p>
      <div class="home-content-message">
        <img :src="item.img" />
        <div class="home-content-message-main">
          <p>{{ item.title }}</p>
          <p>{{ item.content }}</p>
          <el-button @click="jumpTo(item.moduleName)" type="danger">更多</el-button>
        </div>
      </div>
    </div>

    <!-- 图片列表 -->
    <div class="home-content">
      <p class="home-content-title">普陀美景</p>
      <ul id="home_nature_image_list">
        <li :key="i" v-for="(item, i) in natureImages">
          <el-popover placement="top" trigger="hover" width="600">
            <!-- 弹出框大图 -->
            <el-image :src="item.img" fit="fill"></el-image>
            <!-- 缩略图 -->
            <el-image :src="item.img" fit="fill" slot="reference"></el-image>
          </el-popover>
        </li>
        <li @click="$router.push('/nature')">
          <img src="../assets/next.png" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import config from '../config'
import carousel from '../components/Carousel'

export default {
  data() {
    return {
      // 轮播图数据
      imgList: [],
      // 页面数据
      initMessage: [],
      // 展示图片数据
      natureImages: []
    }
  },
  methods: {
    /**
     * 获取初始化页面数据
     */
    initHome() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HOME_COMTENT
      })
        .then(data => {
          // console.log(data.data)
          this.initMessage = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取轮播图数据
     */
    getCarousel() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HOME_CAROUSEL
      })
        .then(data => {
          this.imgList = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取展示图片数据
     */
    getHomeNatureImages() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HOME_NATURE_IMAGES
      })
        .then(data => {
          // console.log(data.data)
          this.natureImages = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 跳转
     */
    jumpTo(index) {
      if (index === '地理环境') {
        this.$router.push('/location')
      } else if (index === '海天佛国') {
        this.$router.push('/buddhism')
      } else if (index === '历史文化') {
        this.$router.push('/location')
      }
    }
  },
  created() {
    // 获取初始化页面数据
    this.initHome()
    this.getCarousel()
    this.getHomeNatureImages()
  },
  components: {
    carousel
  }
}
</script>

<style lang="stylus">
#home
  .home-content
    .home-content-title
      text-align center

    .home-content-message
      p:nth-child(1)
        margin 0

#home_nature_image_list
  list-style none
  padding 0
  margin 0

  li
    text-align center
    padding 0
    margin 0

    .el-image
      width 100%
      height 100%

    &:last-child:hover
      background #e6e6e6

    &:last-child img
      width 100px
      height 90px
      margin-top 30px

@media screen and (max-width: 960px)
  #home
    .home-content
      padding 10px

      img
        width 100%

      .home-content-title
        font-size 1.5rem
        margin 10px 0

      .home-content-message
        p:nth-child(1)
          font-size 1.2rem

        p:nth-child(2)
          font-size 0.8rem

@media screen and (min-width: 960px)
  #home
    .home-content
      padding 50px 15%

      .home-content-title
        font-size 2.5rem
        margin 30px 0

      .home-content-message
        display flex
        display -webkit-flex
        justify-content space-between

        img
          width 35%

        .home-content-message-main
          width 60%

          p:nth-child(1)
            font-size 2rem

          p:nth-child(2)
            font-size 1rem

  #home_nature_image_list
    display flex
    display -webkit-flex
    justify-content flex-start
    flex-wrap wrap

    li
      width 25%
      height calc(@width)
</style>

