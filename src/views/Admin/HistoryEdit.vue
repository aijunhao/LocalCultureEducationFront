<template>
  <div id="history_edit">
    <!-- 右侧导航 -->
    <div id="history_edit_right_menu">
      <ul>
        <!-- 首页 -->
        <li @click="goAnchor('history_edit_home')" class="select menu-title">佛国编年史首页介绍</li>

        <!-- 首页导航模块 -->
        <li @click="goAnchor('history_edit_navigation')" class="menu-title">佛国编年史首页导航</li>
        <ul>
          <li
            :key="i"
            @click="goAnchor('history_edit_navigation_' + i)"
            v-for="(module, i) in moduleList"
          >{{ module.title }}</li>
        </ul>

        <li @click="goAnchor('history_edit_article')" class="menu-title">非物质文化遗产模块</li>

        <!-- 文章 -->
        <ul>
          <li
            :key="i"
            @click="goAnchor('history_edit_article_' + i)"
            v-for="(article, i) in articleList"
          >{{ article.title }}</li>
        </ul>

        <!-- 高僧 -->
        <li @click="goAnchor('history_edit_monk')" class="menu-title">历代高僧</li>

        <!-- 高僧信息 -->
        <ul>
          <li
            :key="i"
            @click="goAnchor('history_edit_monk_' +  i)"
            v-for="(monkList, i) in monkList"
          >{{ monkList.title }}</li>
        </ul>
      </ul>
    </div>

    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>佛国编年史</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 首页 -->
    <div class="history-edit-box anchor-class" id="history_edit_home">
      <p class="title">佛国编年史首页</p>
      <p class="tips">介绍</p>

      <div>介绍</div>
    </div>

    <!-- 首页 -->
    <div class="history-edit-box anchor-class" id="history_edit_navigation">
      <p class="title">佛国编年史首页导航</p>
      <p class="tips">该部分主要包括普陀佛史、历代高僧模块</p>

      <module-edit
        :anchor="'anchor-class'"
        :idName="'history_edit_navigation'"
        :moduleList="moduleList"
        :showJumpModule="true"
        :showModuleName="true"
      ></module-edit>
    </div>

    <!-- 非物质文化遗产页面编辑 -->
    <div class="history-edit-box anchor-class" id="history_edit_article">
      <p class="title">佛国编年史</p>
      <p class="tips">佛国编年史页面，主要包括普陀山佛学文化的诞生和历程等文章描述。</p>

      <!-- 文章编辑列表 -->
      <article-edit
        :anchor="'anchor-class'"
        :articleList="articleList"
        :idName="'history_edit_article'"
      ></article-edit>
    </div>

    <!-- 高僧 -->
    <div class="history-edit-box anchor-class" id="history_edit_monk">
      <p class="title">历代高僧</p>
      <p class="tips">该部分是历史上与普陀山有关僧侣介绍</p>

      <text-edit :anchor="'anchor-class'" :idName="'history_edit_monk'" :textList="monkList"></text-edit>
    </div>
  </div>
</template>

<script>
import ImageEdit from '../../components/ImageEdit'
import ArticleEdit from '../../components/ArticleEdit'
import CarouselEdit from '../../components/CarouselEdit'
import ModuleEdit from '../../components/ModuleEdit'
import TextEdit from '../../components/TextEdit'
import config from '../../config'

export default {
  components: {
    'article-edit': ArticleEdit,
    'image-edit': ImageEdit,
    'carousel-edit': CarouselEdit,
    'module-edit': ModuleEdit,
    'text-edit': TextEdit
  },
  data() {
    return {
      // 高僧
      monkList: [],
      // 导航模块
      moduleList: [],
      // 普陀佛史文章
      articleList: []
    }
  },
  created() {
    this.getHistoryModule()
    this.getMonk()
    this.getHistoryArticle()
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
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
      $('#history_edit_right_menu li').each(function(i) {
        if (i === index) $(this).addClass('select')
        else $(this).removeClass('select')
      })
    },
    // 平滑滚动
    goAnchor(id) {
      $('html,body').animate({ scrollTop: $('#' + id).offset().top - 80 }, 500)
    },
    /**
     * 获取历史文章
     */
    getHistoryArticle() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HISTORY_ARTICLE
      })
        .then(req => {
          if (req.status === 200) {
            console.log(req.data)
            this.articleList = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取初始化页面数据
     */
    getHistoryModule() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HISTORY_HOME
      })
        .then(req => {
          if (req.status === 200) {
            // console.log(req.data)
            this.moduleList = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取僧侣数据
     */
    getMonk() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_BUDDHISM_MONK,
        params: {
          period: '全部',
          page: 0,
          pageSize: 0
        }
      })
        .then(req => {
          if (req.status === 200) {
            console.log(req.data)
            this.monkList = req.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus">
#history_edit_right_menu
  width 200px
  max-height 600px
  overflow-y auto
  position fixed
  right 20px
  top 110px
  color #909399
  font-size 0.8rem

  .menu-title
    padding 10px 0 10px 15px

  li
    padding 2px 0 2px 30px
    list-style none
    border-left 2px solid #909399

  li:hover, .select
    border-left 2px solid #409EFF
    background #fff
    color #409EFF

#history_edit
  .title
    font-size 1.5rem
    font-weight 600
    margin 0

  .tips
    font-size 0.9rem
    color #909399

  .history-edit-box
    background #fff
    padding 50px
    margin-bottom 20px
</style>
