// 佛教文化节
<template>
  <div id="culture">
    <div :key="i" class="culture-content" v-for="(item, i) in culture">
      <div class="culture-content-header">
        <p v-text="item.title">标题</p>
        <p v-text="item.subtitle">时间</p>
      </div>
      <div class="culture-content-body" v-html="item.content">内容</div>

      <!-- 分割线 -->
      <el-divider>
        <i :class="setClass(i)"></i>
      </el-divider>
    </div>
  </div>
</template>

<script>
import config from '../../config'

export default {
  data() {
    return {
      // 类名
      type: ['iconfojing', 'iconfoshou', 'iconfo', 'iconfozhu'],
      culture: [
        {
          title: '',
          time: '',
          content: ''
        }
      ]
    }
  },
  methods: {
    /**
     * 获取文章
     */
    getCulture() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_CULTURE
      })
        .then(data => {
          console.log(data.data)
          if (data.data) this.culture = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 动态设置类
     */
    setClass(index) {
      return ['myicons', this.type[index % this.type.length]]
    }
  },
  created() {
    this.getCulture()
  }
}
</script>


<style lang="stylus">
#culture
  .el-divider__text
    background-color #f2f2f2

  .myicons
    font-size 2rem

  .culture-content
    margin-bottom 50px

  .culture-content-header
    p
      margin 0

      &:nth-child(1)
        font-weight 600

  .culture-content-body
    text-align center

    p
      text-align left
      text-indent 2rem

@media screen and (min-width: 960px)
  #culture
    padding 20px 15%

    .culture-content
      p
        font-size 1rem

      .culture-content-header
        display flex
        display -webkit-flex
        justify-content space-between
        align-items center

        p
          &:nth-child(1)
            font-size 1.5rem

      .culture-content-body
        img
          width 60%

        // 标签
        .label
          font-size 0.8rem
          text-align center

@media screen and (max-width: 960px)
  #culture
    padding 10px

    .culture-content
      p
        font-size 0.8rem

      .culture-content-header
        p
          &:nth-child(1)
            font-size 1.2rem

      .culture-content-body
        img
          width 100%

        // 标签
        .label
          font-size 0.6rem
          text-align center
</style>
