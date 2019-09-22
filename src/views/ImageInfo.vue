<template>
  <div id="imageinfo">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item>图片详情</el-breadcrumb-item>
      <el-breadcrumb-item>{{ imageInfo.title }}</el-breadcrumb-item>
      <el-breadcrumb-item><strong @click="$router.go(-1)">返回上一级</strong></el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 图片对象显示 -->
    <div class="imageinfo-show">
      <p class="imageinfo-show-title" v-text="imageInfo.title"></p>
      <p class="imageinfo-show-author-source">
        <span>发布者：{{ imageInfo.author }}</span>
        <span>来源：{{ imageInfo.source }}</span>
      </p>
      <img :src="imageInfo.url" alt="图片"/>
      <p v-text="imageInfo.content" class="imageinfo-show-content"></p>
      <div class="imageinfo-show-icon">
        <span>
          <i class="el-icon-view"></i>
          {{ imageInfo.looked_number }}
        </span>
        <span>
          <i class="el-icon-chat-dot-round"></i>
          {{ imageInfo.comment_number }}
        </span>
      </div>
    </div>

    <!-- 分割线 -->
    <el-divider content-position="center">少侠请留步，可以在下方留言参与评论哦！</el-divider>

    <!-- 评论 -->
    <div class="imageinfo-comment">
      <comment :commentNumber="imageInfo.comment_number" :id="imageInfoId" @reInit="initInfo"></comment>
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
          console.log(data.data)
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
    text-align center

    .imageinfo-show-title
      text-align center
      font-weight 600
      margin-top 0

    .imageinfo-show-author-source, .imageinfo-show-icon
      display flex
      display -webkit-flex
      justify-content space-around

    .imageinfo-show-content
      text-align left 
      text-indent 2rem

// pc
@media screen and (min-width: 960px)
  #imageinfo
    padding 0 15%

    .imageinfo-show

      img
        width 70%
        min-height 250px

      .imageinfo-show-title
        font-size 1.5rem

// mobile
@media screen and (max-width: 960px)
  #imageinfo
    padding 0 10px

    .imageinfo-show
      font-size 0.8rem

      img
        width 100%
        min-height 250px

      .imageinfo-show-title
        font-size 1.2rem
</style>

