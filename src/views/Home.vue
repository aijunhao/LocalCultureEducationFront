<template>
  <div id="home">
    <!-- 走马灯背景图 -->
    <el-carousel :interval="5000" arrow="always" height="600px">
      <el-carousel-item :key="url" v-for="(url, i) in carouselImgs">
        <el-image :src="url" @click="show(i)" fit="fill"></el-image>
      </el-carousel-item>
    </el-carousel>

    <!-- 位置介绍 -->
    <div class="home-content">
      <p class="home-content-title">位置介绍</p>
      <div class="home-content-message">
        <div class="home-content-message-img">
          <el-image :src="locationMessage.img" fit="fill"></el-image>
        </div>
        <div class="home-content-message-main">
          <p>{{ locationMessage.title }}</p>
          <p>{{ locationMessage.message }}</p>
          <el-button @click="$router.push('/location')" type="danger">更多</el-button>
        </div>
      </div>
    </div>

    <!-- 人文社会 -->
    <div class="home-content">
      <p class="home-content-title">人文社会</p>
      <div class="home-content-message">
        <div class="home-content-message-img">
          <el-image :src="societyMessage.img" fit="fill"></el-image>
        </div>
        <div class="home-content-message-main">
          <p>{{ societyMessage.title }}</p>
          <p>{{ societyMessage.message }}</p>
          <el-button @click="$router.push('/society')" type="danger">更多</el-button>
        </div>
      </div>
    </div>

    <!-- 自然风景 -->
    <div class="home-content">
      <p class="home-content-title">自然风景</p>
      <el-button @click="$router.push('/nature')" type="danger">更多</el-button>
      <ul id="home_nature_image_list">
        <li :key="i" v-for="(item, i) in natureImgs">
          <el-image :src="item" fit="fill"></el-image>
        </li>
      </ul>
    </div>

    <!-- 历史背景 -->
    <div class="home-content">
      <p class="home-content-title">历史背景</p>
      <div class="home-content-message">
        <div class="home-content-message-img">
          <el-image fit="fill" src="http://120.79.254.54:3001/public/images/1.jpg"></el-image>
        </div>
        <div class="home-content-message-main">
          <p>{{ historyMessage.title }}</p>
          <p>{{ historyMessage.message }}</p>
          <el-button @click="$router.push('/society')" type="danger">更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      carouselImgs: [
        'http://120.79.254.54:3001/public/images/1.jpg',
        'http://120.79.254.54:3001/public/images/2.jpg',
        'http://120.79.254.54:3001/public/images/3.jpg',
        'http://120.79.254.54:3001/public/images/4.jpg',
        'http://120.79.254.54:3001/public/images/5.jpg'
      ],
      natureImgs: [
        'http://120.79.254.54:3001/public/images/1.jpg',
        'http://120.79.254.54:3001/public/images/2.jpg',
        'http://120.79.254.54:3001/public/images/3.jpg',
        'http://120.79.254.54:3001/public/images/4.jpg',
        'http://120.79.254.54:3001/public/images/5.jpg',
        'http://120.79.254.54:3001/public/images/1.jpg',
        'http://120.79.254.54:3001/public/images/2.jpg',
        'http://120.79.254.54:3001/public/images/3.jpg'
      ],
      locationMessage: {
        title: '嘉兴',
        message:
          '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        img: 'http://120.79.254.54:3001/public/images/1.jpg'
      },
      historyMessage: {
        title: '嘉兴',
        message:
          '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        img: 'http://120.79.254.54:3001/public/images/1.jpg'
      },
      societyMessage: {
        title: '嘉兴',
        message:
          '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        img: 'http://120.79.254.54:3001/public/images/1.jpg'
      }
    }
  },
  methods: {
    // 图片点击事件
    show(index) {
      console.log(index)
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
    text-align center
    padding 50px

    .home-content-title
      font-size 3rem
      margin 30px

    .home-content-message
      display flex
      display -webkit-flex
      justify-content center

      .home-content-message-img
        width 300px

      .home-content-message-main
        margin-left 50px
        width 50%
        text-align left

      p:nth-child(1)
        font-size 2rem
        margin 0

      p:nth-child(2)
        font-size 1rem

#home_nature_image_list
  list-style none
  padding 0
  margin 50 0

@media screen and (max-width: 960px)
  #home_nature_image_list
    list-style none

@media screen and (min-width: 960px)
  #home_nature_image_list
    display flex
    display -webkit-flex
    justify-content flex-start
    flex-wrap wrap
    width 80%
    margin 50px auto

    >li
      width 25%
      margin 0 auto
</style>

