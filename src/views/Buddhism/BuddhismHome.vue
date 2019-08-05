<template>
  <div id="buddhismhome">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item>海天佛国</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="buddhismhome-overview">
      <p>观音道场普陀山</p>
      <p>中国佛教四大名山之一，是为“五朝恩赐无双地，四海推崇第一山”，以秀丽的自然景观与悠久的佛教文化文明于世，享有“海天佛国”、“人间第一清净寺”之美称。</p>
      <video-player
        :options="playerOptions"
        :playsinline="true"
        :x5-video-player-fullscreen="true"
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        style="object-fit:fill"
      ></video-player>
    </div>

    <div v-if="buddhismHomeContent[0]">
      <div class="buddhismhome-link">
        <i :class="['myicons', 'icons-big', buddhismHomeContent[0].icon]"></i>
        <span v-text="buddhismHomeContent[0].module_name"></span>
        <p>
          <a href="https://i.svrvr.com/?a=wapview&id=s62806" target="_blank">更多</a>
          <i class="myicons icondouble-up"></i>
        </p>
      </div>
      <div class="buddhismhome-box">
        <img :src="buddhismHomeContent[0].url" />
        <div>
          <p class="title" v-text="buddhismHomeContent[0].title"></p>
          <p class="html-content" v-html="buddhismHomeContent[0].content"></p>
        </div>
      </div>
    </div>

    <module :direction="true" :module="buddhismHomeContent[1]" v-if="buddhismHomeContent[1]"></module>

    <div v-if="buddhismHomeContent[2]">
      <div class="buddhismhome-link">
        <i :class="['myicons', 'icons-big', buddhismHomeContent[2].icon]"></i>
        <span v-text="buddhismHomeContent[2].module_name"></span>
        <p @click="$router.push({name: buddhismHomeContent[2].target})">
          更多
          <i class="myicons icondouble-up"></i>
        </p>
      </div>
      <ul class="buddhismhome_image_list">
        <li :key="i" v-for="(item, i) in natureImages">
          <!-- 缩略图 -->
          <el-image :src="item.url" fit="fill"></el-image>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import config from '../../config'
import module from '../../components/Module'

export default {
  data() {
    return {
      buddhismHomeContent: [],
      // 展示图片数据
      natureImages: [],
      // 播放器
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: '',
            src: 'http://120.79.254.54:3004/public/video/普陀山.mp4' //视频url地址
          }
        ],
        poster: 'http://120.79.254.54:3004/public/images/cover.jpg', //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    }
  },
  methods: {
    jump() {
      window.location.href = 'https://i.svrvr.com/?a=wapview&id=s62806'
    },
    /**
     * 获取内容
     */
    getBuddhismHomeContent() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_BUDDHISM_HOME
      })
        .then(req => {
          console.log(req.data)
          if (req.status === 200) this.buddhismHomeContent = req.data
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
        .then(req => {
          if (req.status === 200) {
            for (var i = 0; i < 4; i++) this.natureImages.push(req.data[i])
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  components: {
    module
  },
  created() {
    this.getHomeNatureImages()
    this.getBuddhismHomeContent()
  }
}
</script>

<style lang="stylus">
// 修改播放按钮
.video-js .vjs-big-play-button
  width 72px
  height 72px
  border-radius 100%
  z-index 100
  background-color #ffffff
  border solid 1px #979797

#buddhismhome
  padding 20px 15%

  a
    color black
    text-decoration none
    margin-right 3px

  .buddhismhome-overview
    margin-bottom 20px

  .buddhismhome-link
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

  .buddhismhome-box
    margin-top 10px

    .title
      text-align center
      font-family '微软雅黑'

    .content
      text-indent 2rem
      -webkit-line-clamp 10
      display -webkit-box
      overflow hidden
      -webkit-box-orient vertical

  .html-content > p
    margin 5px 0

  .buddhismhome_image_list
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

@media screen and (min-width: 960px)
  #buddhismhome
    padding 20px 15%

    .buddhismhome-box
      display flex
      display -webkit-flex
      justify-content space-between
      margin-bottom 20px
      max-height 300px

      div
        box-sizing border-box
        width 50%
        padding 10px

        .title
          font-size 1.8rem
          margin 10px 0

        .content
          font-size 1rem

      img
        width 45%

    .buddhismhome_image_list
      display flex
      display -webkit-flex
      justify-content flex-start
      flex-wrap wrap

      li
        width 25%
        height 150px

@media screen and (max-width: 960px)
  #buddhismhome
    padding 10px

    .buddhismhome-box
      margin-bottom 10px

      div
        padding 10px

        .title
          font-size 1.5rem
          margin 10px 0

        .content
          font-size 0.8rem

      img
        width 100%
        height @width * 0.8
</style>
