// 佛教文化节
<template>
  <div id="culture">
    <!-- 右侧导航 -->
    <div id="culture_right_menu">
      <ul>
        <li :class="{select: 0 === index}" @click="goAnchor(0)">总览</li>
        <li
          :class="{select: i + 1 === index}"
          :key="i"
          @click="goAnchor(i + 1)"
          v-for="(item, i) in culture"
        >{{ item.title }}</li>
      </ul>
    </div>

    <!-- 面包屑 -->
    <el-breadcrumb
      class="anchor-class"
      separator-class="el-icon-arrow-right"
      style="line-height: 64px"
    >
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buddhism/culturehome'}">佛学文化</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buddhism/culture' }">非物质文化遗产</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buddhism/culture' }">总览</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 总览 -->
    <div class="culture-overview">
      <img alt src="../../assets/非物质文化遗产.jpg" />
      <div>
        <p>一是国家级非遗“观音传说”，不仅包含了丰富感人的观音民间故事，还有观音造像艺术、自然景观造型传说以及观音文化节庆活动；</p>
        <p>二是省级非遗“观音香会”。每逢二月十九观音圣诞日、六月十九观音得道日、九月十九观音出家日，来自全国各地及海外许多地方的游客与信士云集到普陀山朝山进香，参观访问，参加各种法事活动和寺庙盛典。</p>
        <p>三是省级非遗“普陀山佛茶茶道”。它是普陀山僧人在斋戒沐浴、虔心颂佛后，经过一整套严谨而神圣的茶道仪式来泡制茶的全过程，是佛教禅文化和传统茶文化的有机结合。经普查，普陀山还有包括方言、制造技艺、民间故事等很多其他非物质文化遗产，成为浙江省非物文化遗产生态保护区和省级文化旅游景区。</p>
        <p>此外，还有众多未被列入非遗名单的内容，也十足珍贵。</p>
      </div>
    </div>

    <!-- 文章模块 -->
    <div :key="i" class="culture-content" v-for="(item, i) in culture">
      <div class="culture-content-header anchor-class">
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
      ],
      // 当前位置标签
      index: 0
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
    },
    // 平滑滚动
    goAnchor(index) {
      // console.log(index)
      // 顶部偏移量
      let currentTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
      // 目标距离，特殊情况需要减去顶部
      let target = document.getElementsByClassName('anchor-class')[index]
        .offsetTop
      target -= 80
      // 总偏移量 = 目标位置 - 当前位置， 正负不论
      let total = target - currentTop
      let step = 30

      clearInterval(timer)
      let timer = setInterval(() => {
        if (total >= 0) {
          if (currentTop + step >= target) {
            document.documentElement.scrollTop = target
            window.pageYOffset = target
            document.body.scrollTop = target
            clearInterval(timer)
          } else {
            document.documentElement.scrollTop += step
            window.pageYOffset += step
            document.body.scrollTop += step
            currentTop += step
          }
        } else if (total < 0) {
          if (currentTop - step <= target) {
            document.documentElement.scrollTop = target
            window.pageYOffset = target
            document.body.scrollTop = target
            clearInterval(timer)
          } else {
            document.documentElement.scrollTop -= step
            window.pageYOffset -= step
            document.body.scrollTop -= step
            currentTop -= step
          }
        }
      }, 1)
    },
    /**
     * 滚动监听
     */
    handleScroll() {
      let currentTop =
        window.pageYOffset ||
        document.body.scrollTop ||
        document.documentElement.scrollTop
      let target = document.getElementsByClassName('anchor-class')
      for (var i = 0; i < target.length - 1; i++) {
        if (
          currentTop >= target[i].offsetTop - 80 &&
          currentTop < target[i + 1].offsetTop - 80
        )
          this.index = i
      }
      if (currentTop >= target[target.length - 1].offsetTop - 80)
        this.index = target.length - 1
    }
  },
  created() {
    this.getCulture()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
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
  #culture_right_menu
    width 200px
    max-height 600px
    overflow-y auto
    position fixed
    right 13%
    top 110px
    color #909399
    font-size 0.8rem

    li
      padding 2px 0 2px 30px
      list-style none
      border-left 2px solid #909399

    li:hover, .select
      border-left 2px solid #409EFF
      background #fff
      color #409EFF

  #culture
    padding-right calc(15% + 200px)
    padding-left 15%

    .culture-overview
      display flex
      display -webkit-flex
      justify-content space-between
      margin-bottom 20px

      img
        width 250px
        height 250px

      div
        width calc(100% - 300px)

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
