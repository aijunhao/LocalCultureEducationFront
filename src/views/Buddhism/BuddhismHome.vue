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

    <div v-for="(item, i) in buddhismHomeContent" :key="i">
      <div class="buddhismhome-link">
        <i :class="['myicons', 'icons-big', item.icon]"></i>
        <span v-text="item.module_name"></span>
        <p @click="$router.push({name: item.target})">
          更多
          <i class="myicons icondouble-up"></i>
        </p>
      </div>
      <div :class="['buddhismhome-box', i % 2 ? 'direction' : '']">
        <img :src="item.url" />
        <div>
          <p class="title" v-text="item.title"></p>
          <p class="content" v-html="item.content" v-if="i === 0"></p>
          <p class="content" v-text="item.content" v-else></p>
        </div>
      </div>
    </div>

    <!-- <div>
      <div class="buddhismhome-link">
        <i class="myicons iconVRquanjingtu icons-big"></i>
        <span>VR 全景逛普陀</span>
        <p>
          <a href="https://i.svrvr.com/?a=wapview&id=s62806" target="_blank">详情</a>
          <i class="myicons icondouble-up"></i>
        </p>
      </div>
      <div class="buddhismhome-box">
        <img alt src="http://120.79.254.54:3004/public/images/VR全景逛普陀.png" />
        <div>
          <p>版权所有：普陀山佛教协会</p>
          <p>开发者：心佛文化传播公司</p>
          <p>摄影师：杨赫</p>
          <p>平台：视维云</p>
          <p>作品详情：庆祝南海观音开光二十周年</p>
          <p style="color: red">说明：此部分仅用于普陀山佛学乡土文化教育学习拓展，我们只提供站外链接，如果侵权行为，请联系删除。</p>
        </div>
      </div>
    </div> -->

    <!-- <div>
      <div class="buddhismhome-link">
        <i class="myicons iconsimiao icons-big"></i>
        <span>寺庙庵堂</span>
        <p @click="$router.push({name: 'building'})">
          更多
          <i class="myicons icondouble-up"></i>
        </p>
      </div>
      <div class="buddhismhome-box"></div>
    </div> -->

    <!-- <div>
      <div class="buddhismhome-link">
        <i class="myicons iconshanshui icons-big"></i>
        <span>普陀山水</span>
        <p @click="$router.push({name: 'Scenery'})">
          更多
          <i class="myicons icondouble-up"></i>
        </p>
      </div>
      <div class="buddhismhome-box">普陀山水</div>
    </div> -->

    <!-- <div class="buddhismhome-router">
      <div>
        <a href="https://i.svrvr.com/?a=wapview&id=s62806" target="_blank">
          <img alt src="../../assets/VR全景逛普陀.png" />
          普陀山VR全景
        </a>
      </div>
      <div @click="$router.push('/buddhism/building')">
        <img alt src="../../assets/海天佛国普陀圣境.png" />
        寺庙庵堂
      </div>
      <div @click="$router.push('/buddhism/scenery')">
        <img alt src="../../assets/普陀山水.png" />
        普陀山水
      </div>
    </div>-->
  </div>
</template>

<script>
import config from '../../config'

export default {
  data() {
    return {
      buddhismHomeContent: '',
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
    }
  },
  created() {
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

    a
      text-decoration none
      color black

  .icons-big
    font-size 32px

@media screen and (min-width: 960px)
  #buddhismhome
    padding 20px 15%

    .buddhismhome-box
      display flex
      display -webkit-flex
      justify-content space-between
      margin-bottom 20px

      // height 300px
      div
        box-sizing border-box
        width 55%
        padding 10px

      img
        width 40%

@media screen and (max-width: 960px)
  #buddhismhome
    padding 10px

    .buddhismhome-router
      font-size 0.8rem
</style>
