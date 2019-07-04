<template>
  <div id="imageinfo">
    <!-- 图片对象显示 -->
    <div class="imageinfo-show">
      <p v-text="imgObj.title"></p>
      <el-image :src="imgObj.img" fit="contain"></el-image>
      <p v-text="imgObj.content"></p>
      <div class="imageinfo-show-icon">
        <span>
          <i class="el-icon-view"></i>
          {{ imgObj.lookedNumber }}
        </span>
        <span>
          <i class="el-icon-chat-dot-round"></i>
          {{ imgObj.commentNumber }}
        </span>
      </div>
    </div>

    <!-- 分割线 -->
    <el-divider content-position="center">少侠请留步，可以在下方留言参与评论哦！</el-divider>

    <!-- 评论 -->
    <div class="imageinfo-comment">
      <comment></comment>
    </div>
  </div>
</template>

<script>
import comment from "../components/Comment"

export default {
  data() {
    return {}
  },
  components: {
    comment
  },
  props: ['imgObj']
}
</script>

<style lang="stylus">
#imageinfo
  .el-divider__text
    background #f2f2f2

  .imageinfo-show
    width 100%

    .el-image
      width 100%

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
    padding 100px 15%

// mobile
@media screen and (max-width: 960px)
  #imageinfo
    padding 100px 10px
</style>

