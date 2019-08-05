<template>
  <div id="culture">
    <!-- 右侧导航 -->
    <div id="culture_right_menu">
      <ul>
        <li @click="goAnchor('culture_overview')" class="select">总览</li>
        <li
          :key="i"
          @click="goAnchor('culture_article_' + i)"
          v-for="(item, i) in cultureArticleList"
        >{{ item.title }}</li>
      </ul>
    </div>

    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buddhism/culturehome'}">佛学文化</el-breadcrumb-item>
      <el-breadcrumb-item>非物质文化遗产</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 总览 -->
    <divider :icon="'iconyichanjicheng'" :title="'非物质文化遗产'"></divider>
    <div class="culture-overview anchor-class" id="culture_overview">
      <img alt src="../../assets/非物质文化遗产.jpg" />
      <div>
        <p>一是国家级非遗“观音传说”，不仅包含了丰富感人的观音民间故事，还有观音造像艺术、自然景观造型传说以及观音文化节庆活动；</p>
        <p>二是省级非遗“观音香会”。每逢二月十九观音圣诞日、六月十九观音得道日、九月十九观音出家日，来自全国各地及海外许多地方的游客与信士云集到普陀山朝山进香，参观访问，参加各种法事活动和寺庙盛典。</p>
        <p>三是省级非遗“普陀山佛茶茶道”。它是普陀山僧人在斋戒沐浴、虔心颂佛后，经过一整套严谨而神圣的茶道仪式来泡制茶的全过程，是佛教禅文化和传统茶文化的有机结合。经普查，普陀山还有包括方言、制造技艺、民间故事等很多其他非物质文化遗产，成为浙江省非物文化遗产生态保护区和省级文化旅游景区。</p>
        <p>此外，还有众多未被列入非遗名单的内容，也十足珍贵。</p>
      </div>
    </div>

    <!-- 文章模块 -->
    <divider :icon="'iconwenzhang'" :title="'文章描述'"></divider>
    <div v-if="cultureArticleList.length != 0">
      <article-box
        :anchor="'anchor-class'"
        :articleList="cultureArticleList"
        :idName="'culture_article'"
      ></article-box>
    </div>
  </div>
</template>

<script>
import config from '../../config'
import ArticleBox from '../../components/ArticleBox'
import divider from '../../components/Divider'

export default {
  components: {
    'article-box': ArticleBox,
    divider
  },
  data() {
    return {
      cultureArticleList: []
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
        .then(req => {
          if (req.data) this.cultureArticleList = req.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 平滑滚动
    goAnchor(id) {
      $('html,body').animate({ scrollTop: $('#' + id).offset().top - 80 }, 500)
    },
    /**
     * 滚动监听
     */
    handleScroll() {
      let $currentTop = $(document).scrollTop()
      let $target = $('.anchor-class')
      let index = 0
      for (var i = 0; i < $target.length - 1; i++) {
        if (
          $currentTop >= $target[i].offsetTop - 80 &&
          $currentTop < $target[i + 1].offsetTop - 80
        )
          index = i
      }
      if ($currentTop >= $target[$target.length - 1].offsetTop - 80)
        index = $target.length - 1

      // 设置选中项
      $('#culture_right_menu li').each(function(i) {
        if (i === index) $(this).addClass('select')
        else $(this).removeClass('select')
      })
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
    padding-top 20px
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

@media screen and (max-width: 960px)
  #culture_right_menu
    display none

  #culture
    padding 10px
    font-size 0.8rem

    .culture-overview
      img
        width 100%
</style>
