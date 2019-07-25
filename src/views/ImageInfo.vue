<template>
  <div id="imageinfo">
    <!-- 图片对象显示 -->
    <div class="imageinfo-show">
      <p v-text="imageInfo.title"></p>
      <img :src="imageInfo.url" alt="图片" />
      <p v-text="imageInfo.content"></p>
      <div class="imageinfo-show-icon">
        <span>
          <i class="el-icon-view"></i>
          {{ imageInfo.lookedNumber }}
        </span>
        <span>
          <i class="el-icon-chat-dot-round"></i>
          {{ imageInfo.commentNumber }}
        </span>
      </div>
    </div>

    <!-- 分割线 -->
    <el-divider content-position="center">少侠请留步，可以在下方留言参与评论哦！</el-divider>

    <!-- 评论 -->
    <div class="imageinfo-comment">
      <comment :commentNumber="imageInfo.commentNumber" :id="imageInfoId" @reinit="initInfo()"></comment>
    </div>
  </div>
</template>

<script>
import comment from '../components/Comment'
import config from '../config'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      imageInfo: {}
    }
  },
  components: {
    comment
  },
  created() {
    this.initInfo()
  },
  methods: {
    /**
     * 获取图片详情信息
     */
    initInfo() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_IMAGE_INFO + `/${this.imageInfoId}`
      })
        .then(data => {
          // console.log(data.data)
          this.imageInfo = data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    ...mapState({
      imageInfoId: state => {
        // 判断是否为空
        if (state.imageInfoId === '') {
          state.imageInfoId = parseInt(sessionStorage.getItem('imageInfoId'))
        }
        return parseInt(state.imageInfoId)
      }
    })
  }
}
</script>

<style lang="stylus">
#imageinfo
  .el-divider__text
    background #f2f2f2
    font-size 0.8rem

  .imageinfo-show
    width 100%

    img
      width 100%
      min-height 250px
      background #fff

    p:first-child
      text-align center
      font-size 1rem
      font-weight 600

    p:last-child
      font-size 1rem

    .imageinfo-show-icon
      display flex
      display -webkit-flex
      justify-content space-around

// pc
@media screen and (min-width: 960px)
  #imageinfo
    padding 0 15%

// mobile
@media screen and (max-width: 960px)
  #imageinfo
    padding 0 10px
</style>

