<template>
  <div id="home">
    <!-- 轮播图 -->
    <carousel :imgList="imgList"></carousel>

    <div class="home-main">
      <!-- 首页导航 -->
      <template v-for="(item, i) in initMessage">
        <div class="home-content">
          <p class="home-content-title">{{ item.module_name }}</p>
          <div class="home-content-message">
            <div class="home-content-message-img">
              <img :src="item.url" />
            </div>
            <div class="home-content-message-main">
              <p>{{ item.title }}</p>
              <p>{{ item.content }}</p>
              <el-button @click="$router.push({name: item.target})" type="danger">更多</el-button>
            </div>
          </div>
        </div>
        <divider
          :icon="'iconlianhuachan'"
          :position="'center'"
          :preTitle="i % 2 === 0 ? '普' : '佛'"
          :title="i % 2 === 0 ? '陀' : '缘'"
        ></divider>
      </template>

      <!-- 图片列表 -->
      <div class="home-content">
        <p class="home-content-title">普陀山水</p>
        <ul id="home_nature_image_list">
          <li :key="i" v-for="(item, i) in natureImages">
            <el-popover placement="top" trigger="hover" width="600">
              <!-- 弹出框大图 -->
              <el-image :src="item.url" fit="fill"></el-image>
              <!-- 缩略图 -->
              <el-image :src="item.url" fit="fill" slot="reference"></el-image>
            </el-popover>
          </li>
          <li @click="$router.push({name: 'Scenery'})">
            <i class="myicons iconmore"></i>
            <p>查看更多</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'
import carousel from '../components/Carousel'
import divider from '../components/Divider'

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
    getHomeContent() {
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
          // console.log(data.data)
          if (data.data) this.imgList = data.data
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
    }
  },
  created() {
    // 获取初始化页面数据
    this.getHomeContent()
    this.getCarousel()
    this.getHomeNatureImages()
  },
  components: {
    carousel,
    divider
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

    .myicons
      display inline-block
      font-size 32px
      margin-top 40px

@media screen and (max-width: 960px)
  #home
    .home-main
      padding 10px

      .home-content
        padding 10px 0

        img
          width 100%

        .home-content-title
          font-size 1.5rem
          margin 0 0 10px 0

        .home-content-message
          p:nth-child(1)
            font-size 1.2rem

          p:nth-child(2)
            font-size 0.8rem

@media screen and (min-width: 960px)
  #home
    .home-main
      padding 0 15%

    .home-content
      padding 30px 0

      .home-content-title
        font-size 2.5rem
        margin 0 0 20px 0

      .home-content-message
        display flex
        display -webkit-flex
        justify-content space-between

        .home-content-message-img
          width 35%

          img
            width 100%
            height 100%

        .home-content-message-main
          width 60%

          p:nth-child(1)
            font-size 2rem

          p:nth-child(2)
            font-size 1rem
            -webkit-line-clamp 8
            display -webkit-box
            overflow hidden
            -webkit-box-orient vertical

  #home_nature_image_list
    display flex
    display -webkit-flex
    justify-content flex-start
    flex-wrap wrap

    li
      width 25%
      height 150px
</style>

