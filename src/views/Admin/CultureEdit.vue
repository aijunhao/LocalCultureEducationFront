<template>
  <div id="culture_edit">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>佛国文化</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 右侧快速导航 -->
    <div id="culture_edit_right_menu">
      <ul>
        <!-- 首页 -->
        <li @click="goAnchor('culture_edit_home')" class="select menu-title">佛国文化首页介绍</li>

        <!-- 首页导航模块 -->
        <li @click="goAnchor('culture_edit_navigation')" class="menu-title">佛国文化首页导航</li>
        <ul>
          <li
            :key="i"
            @click="goAnchor('culture_edit_navigation_' + i)"
            v-for="(module, i) in moduleList"
          >{{ module.title }}</li>
        </ul>

        <!-- 博物馆 -->
        <li @click="goAnchor('culture_edit_museum')" class="menu-title">博物馆模块</li>

        <!-- 展品 -->
        <ul>
          <li
            :key="i"
            @click="goAnchor('exhibit_' + i)"
            v-for="(exhibit, i) in exhibitList"
          >{{ exhibit.title }}</li>
        </ul>

        <li @click="goAnchor('culture_edit_guanyin')" class="menu-title">观音法界轮播图模块</li>
        <li @click="goAnchor('culture_edit_guanyin_main')" class="menu-title">观音法界总体规划</li>
        <li @click="goAnchor('culture_edit_guanyin_project')" class="menu-title">观音法界单体项目模块</li>

        <!-- 观音法界单体项目 -->
        <ul>
          <li
            :key="i"
            @click="goAnchor('culture_edit_gy_p_' + i)"
            v-for="(project, i) in guanyinSingleProjectList"
          >{{ project.title }}</li>
        </ul>

        <li @click="goAnchor('culture_edit_culture')" class="menu-title">非物质文化遗产模块</li>

        <!-- 文章 -->
        <ul>
          <li
            :key="i"
            @click="goAnchor('culture_edit_article_' + i)"
            v-for="(article, i) in articleList"
          >{{ article.title }}</li>
        </ul>
      </ul>
    </div>

    <!-- 首页 -->
    <div class="culture-edit-box anchor-class" id="culture_edit_home">
      <p class="title">佛国文化首页</p>
      <p class="tips">关于这模块的介绍</p>

      <div>介绍</div>
    </div>

    <!-- 首页 -->
    <div class="culture-edit-box anchor-class" id="culture_edit_navigation">
      <p class="title">佛国文化首页导航</p>
      <p class="tips">该部分主要包括佛国馆藏、观音法界、非物质文化遗产模块</p>

      <module-edit
        :anchor="'anchor-class'"
        :idName="'culture_edit_navigation'"
        :moduleList="moduleList"
        :showJumpModule="true"
        :showModuleName="true"
      ></module-edit>
    </div>

    <!-- 博物馆页面编辑 -->
    <div class="culture-edit-box anchor-class" id="culture_edit_museum">
      <p class="title">博物馆模块</p>
      <p class="tips">博物馆模块页面，主要包括博物馆介绍及展品展示等。</p>

      <!-- 展品展示 -->
      <image-edit :anchor="'anchor-class'" :idName="'exhibit'" :imageList="exhibitList"></image-edit>
    </div>

    <!-- 观音法界页面轮播图编辑 -->
    <div class="culture-edit-box anchor-class" id="culture_edit_guanyin">
      <p class="title">观音法界轮播图模块</p>
      <p class="tips">轮播图组件，此模块建议采用 JPG 格式的图片。</p>
      <carousel-edit :imageList="guanyinList" :type="2"></carousel-edit>
    </div>

    <!-- 观音法界总体规划 -->
    <div class="culture-edit-box anchor-class" id="culture_edit_guanyin_main">
      <p class="title">观音法界总体规划</p>
      <p class="tips">关于这模块的介绍</p>

      <div v-for="(item, i) in guanyinArticleList" :key="i">
        <p>标题：{{ item.title }}</p>
        <p>内容：{{ item.content }}</p>
      </div>
    </div>

    <!-- 观音法界页面单体项目编辑 -->
    <div class="culture-edit-box anchor-class" id="culture_edit_guanyin_project">
      <p class="title">观音法界单体项目模块</p>
      <p class="tips">该模块主要介绍观音法界的五个单体项目，分别为居士学院、正法讲寺暨中国佛学院普陀山学院女众部、观音圣坛、普隐精舍、中国佛学院普陀山学院男众部及扩建工程。</p>

      <module-edit
        :anchor="'anchor-class'"
        :idName="'culture_edit_gy_p'"
        :inputMaxRows="7"
        :moduleList="guanyinSingleProjectList"
      ></module-edit>
    </div>

    <!-- 非物质文化遗产页面编辑 -->
    <div class="culture-edit-box anchor-class" id="culture_edit_culture">
      <p class="title">非物质文化遗产模块</p>
      <p class="tips">非物质文化遗产页面，主要包括佛学非物质文化遗产及佛学文化日等文章描述。</p>

      <!-- 文章编辑列表 -->
      <article-edit
        :anchor="'anchor-class'"
        :articleList="articleList"
        :idName="'culture_edit_article'"
      ></article-edit>
    </div>
  </div>
</template>
 
<script>
import ImageEdit from '../../components/ImageEdit'
import ArticleEdit from '../../components/ArticleEdit'
import CarouselEdit from '../../components/CarouselEdit'
import ModuleEdit from '../../components/ModuleEdit'
import config from '../../config'

export default {
  components: {
    'article-edit': ArticleEdit,
    'image-edit': ImageEdit,
    'carousel-edit': CarouselEdit,
    'module-edit': ModuleEdit
  },
  data() {
    return {
      // 文章列表
      articleList: [],
      // 展品列表
      exhibitList: [],
      // 观音轮播图列表
      guanyinList: [],
      // 观音法界单体项目列表
      guanyinSingleProjectList: [],
      // 观音法界文章数据
      guanyinArticleList: [],
      // 首页模块数据
      moduleList: []
    }
  },
  created() {
    this.getCulture()
    this.getExhibits()
    this.getCarousel()
    this.getCultureModule()
    this.getProject()
    this.getArticle()
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
      $('#culture_edit_right_menu li').each(function(i) {
        if (i === index) $(this).addClass('select')
        else $(this).removeClass('select')
      })
    },
    // 平滑滚动
    goAnchor(id) {
      $('html,body').animate({ scrollTop: $('#' + id).offset().top - 80 }, 500)
    },
    /**
     * 获取非物质文化遗产文章
     */
    getCulture() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_CULTURE
      })
        .then(req => {
          if (req.status === 200) this.articleList = req.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取展品数据
     */
    getExhibits() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_EXHIBITS
      })
        .then(req => {
          if (req.status === 200) {
            this.exhibitList = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取观音法界轮播图数据
     */
    getCarousel() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_GUANYIN_CAROUSEL
      })
        .then(req => {
          if (req.data) {
            console.log(req.data)
            this.guanyinList = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取观音法界单体项目数据
     */
    getProject() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_GUANYIN_PROJECT
      })
        .then(req => {
          if (req.data) {
            // console.log(req.data)
            this.guanyinSingleProjectList = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取观音法界文章
     */
    getArticle() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_GUANYIN_ARTICLE
      })
        .then(req => {
          if (req.data) {
            // console.log(req.data)
            this.guanyinArticleList = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取文化首页模块数据
     */
    getCultureModule() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_CULTURE_HOME
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
    }
  }
}
</script>

<style lang="stylus">
// 全局属性，右侧快速导航
#culture_edit_right_menu
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

#culture_edit
  .title
    font-size 1.5rem
    font-weight 600
    margin 0

  .tips
    font-size 0.9rem
    color #909399

  .culture-edit-box
    background #fff
    padding 50px
    margin-bottom 20px
</style>
