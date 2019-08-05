<template>
  <div id="divider">
    <el-divider :content-position="position">
      <P v-if="preTitle">{{ preTitle }}</P>
      <i :class="['myicons', icon]" v-if="icon"></i>
      <P v-if="title">{{ title }}</P>
    </el-divider>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      default: 'left'
    },
    // 自定义标题
    title: {
      type: String
    },
    // 自定义前置标题
    preTitle: {
      type: String
    },
    // 自定义图标
    icon: {
      type: String
    }
  },
  data() {
    return {
      // 分割线类名
      typeList: [
        { title: '文章描述', icon: 'iconwenzhang' },
        { title: '专题图集', icon: 'iconzhuantituji' },
        { title: '图表', icon: 'icontubiao' },
        { title: '地图', icon: 'iconchinamap-chart' },
        { title: '地质地貌', icon: 'icondizhihuanjing-' },
        { title: '植被信息', icon: 'iconzhiwu' },
        { title: '轮播图', icon: 'iconlunbotupianman' }
      ]
    }
  }
}
</script>


<style lang="stylus">
#divider
  p
    display inline-block
    margin 0

  .el-divider__text
    background-color #f2f2f2
    font-family '华文行楷'

  .el-divider--horizontal
    height 2px !important

  .myicons
    margin 0 10px

@media screen and (max-width: 960px)
  #divider
    padding 15px 0

    p
      line-height 32px

    .el-divider__text
      font-size 0.8rem

    .el-divider--horizontal
      margin 0

    .myicons
      font-size 0.8rem
      margin 0 5px

@media screen and (min-width: 960px)
  #divider
    padding 30px 0

    p
      line-height 32px

    .el-divider__text
      font-size 1.2rem

    .el-divider--horizontal
      margin 0

    .myicons
      font-size 1.5rem
      margin-right 10px
</style>
