<template>
  <div id="home">
    <!-- 走马灯背景图 -->
    <el-carousel :height="carouselHeight" :interval="5000" arrow="always">
      <el-carousel-item :key="i" v-for="(item, i) in carouselImgs">
        <el-image :src="item.img" @click="show(i)" fit="fill"></el-image>
      </el-carousel-item>
    </el-carousel>

    <div class="home-content" v-for="(item, i) in initMessage" :key="i">
      <p class="home-content-title">{{ content[i] }}</p>
      <div class="home-content-message">
        <div class="home-content-message-img">
          <el-image :src="item.img" fit="fill"></el-image>
        </div>
        <div class="home-content-message-main">
          <p>{{ item.title }}</p>
          <p>{{ item.content }}</p>
          <el-button @click="jumpTo(i)" type="danger">更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  data() {
    return {
      // 轮播图大小
      carouselHeight: '600px',
      // 轮播图数据
      carouselImgs: [],
      // 页面数据
      initMessage: [],
      content: ['地理环境', '历史背景', '人文社会']
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
          console.log(data.data)
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
          this.carouselImgs = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 图片点击事件
     */
    show(index) {
      console.log(index)
    },
    /**
     * 轮播图重载
     */
    homeCarouselLoad() {
      this.$nextTick(() => {
        this.carouselHeight = window.innerWidth * 0.5 + 'px'
      })
    },
    /**
     * 跳转
     */
    jumpTo(index) {
      if (index === 0) {
        this.$router.push('/location')
      } else if (index === 1) {
        this.$router.push('/location')
      } else if (index === 2) {
        this.$router.push('/location')
      }
    }
  },
  created() {
    // 获取初始化页面数据
    this.initHome()
    this.getCarousel()
  },
  mounted() {
    // 当页面渲染完成时，重载轮播图大小
    this.homeCarouselLoad()
    window.onresize = () => {
      this.homeCarouselLoad()
    }
  }
}
</script>

<style lang="stylus">
#home
  .el-image
    height 100%
    width 100%

  .home-content
    .home-content-message-img
      min-height 100px
      background #fff

    .home-content-title
      text-align center
      font-size 2.5rem
      margin 30px 0

    .home-content-message
      p:nth-child(1)
        font-size 2rem
        margin 0

      p:nth-child(2)
        font-size 1rem

#home_nature_image_list
  list-style none

  li
    text-align center
    padding 0

  li:last-child:hover
    background #e6e6e6

  li:last-child img
    width 100px
    height 90px
    margin-top 30px

@media screen and (max-width: 960px)
  #home
    .home-content
      padding 10px

      .home-content-message-img
        width 100%
        margin-bottom 10px

  #home_nature_image_list li
    margin-bottom 10px
    min-height 50px
    background-color #fff

@media screen and (min-width: 960px)
  #home
    .home-content
      padding 10px 15%

      .home-content-message
        display flex
        display -webkit-flex

        .home-content-message-img
          width 25%
          min-width 300px

        .home-content-message-main
          margin-left 5%
          width 95%

  #home_nature_image_list
    display flex
    display -webkit-flex
    justify-content flex-start
    flex-wrap wrap

    li
      width 25%
      height 150px
</style>

