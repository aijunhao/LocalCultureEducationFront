<template>
  <div id="home">
    <!-- 走马灯背景图 -->
    <el-carousel :height="carouselHeight" :interval="5000" arrow="always">
      <el-carousel-item :key="url" v-for="(url, i) in initMessage.carouselImgs">
        <el-image :src="url" @click="show(i)" fit="fill"></el-image>
      </el-carousel-item>
    </el-carousel>

    <!-- 地理位置 -->
    <div class="home-content">
      <p class="home-content-title">{{ initMessage.location.title }}</p>
      <div class="home-content-message">
        <div class="home-content-message-img">
          <el-image :src="initMessage.location.img" fit="fill"></el-image>
        </div>
        <div class="home-content-message-main">
          <p>{{ initMessage.location.subtitle }}</p>
          <p>{{ initMessage.location.message }}</p>
          <el-button @click="$router.push('/location')" type="danger">更多</el-button>
        </div>
      </div>
    </div>

    <!-- 人文社会 -->
    <div class="home-content">
      <p class="home-content-title">{{ initMessage.society.title }}</p>
      <div class="home-content-message">
        <div class="home-content-message-img">
          <el-image :src="initMessage.society.img" fit="fill"></el-image>
        </div>
        <div class="home-content-message-main">
          <p>{{ initMessage.society.subtitle }}</p>
          <p>{{ initMessage.society.message }}</p>
          <el-button @click="$router.push('/society')" type="danger">更多</el-button>
        </div>
      </div>
    </div>

    <!-- 自然风景 -->
    <div class="home-content">
      <p class="home-content-title">{{ initMessage.nature.title }}</p>
      <ul id="home_nature_image_list">
        <li :key="i" v-for="(item, i) in initMessage.nature.imgs">
          <el-popover placement="top" trigger="hover" width="600">
            <!-- 弹出框大图 -->
            <el-image :src="item" fit="fill"></el-image>
            <!-- 缩略图 -->
            <el-image :src="item" fit="fill" slot="reference"></el-image>
          </el-popover>
        </li>
        <li @click="$router.push('/nature')">
          <img src="../assets/next.png" />
        </li>
      </ul>
    </div>

    <!-- 历史背景 -->
    <div class="home-content">
      <p class="home-content-title">{{ initMessage.history.title }}</p>
      <div class="home-content-message">
        <div class="home-content-message-img">
          <el-image :src="initMessage.history.img" fit="fill"></el-image>
        </div>
        <div class="home-content-message-main">
          <p>{{ initMessage.history.subtitle }}</p>
          <p>{{ initMessage.history.message }}</p>
          <el-button @click="$router.push('/society')" type="danger">更多</el-button>
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
      // 页面数据
      initMessage: {
        carouselImgs: [],
        // 自然风景模块数据
        nature: {
          title: '',
          imgs: []
        },
        // 地理位置模块数据
        location: {
          title: '',
          subtitle: '',
          message: '',
          img: ''
        },
        // 历史模块数据
        history: {
          title: '',
          subtitle: '',
          message: '',
          img: ''
        },
        // 人文社会模块数据
        society: {
          title: '',
          subtitle: '',
          message: '',
          img: ''
        }
      }
    }
  },
  methods: {
    /**
     * 获取初始化页面数据
     */
    homeInit() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HOME_INIT
      })
        .then(data => {
          this.initMessage = data.data
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
    }
  },
  created() {
    // 获取初始化页面数据
    this.homeInit()
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

