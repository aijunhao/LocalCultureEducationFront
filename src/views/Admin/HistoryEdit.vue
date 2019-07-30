<template>
  <div id="history_edit">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>佛国编年史</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 首页 -->
    <div class="history-edit-box" id>
      <p class="title">佛国编年史首页</p>
      <p class="tips">介绍</p>

      <div>介绍</div>
    </div>

    <!-- 首页 -->
    <div class="history-edit-box">
      <p class="title">佛国编年史首页导航</p>
      <p class="tips">该部分主要包括普陀佛史、历代高僧模块</p>

      <module-edit
        :disabled="moduleDisabled"
        :moduleList="moduleList"
        :showJumpModule="true"
        :showModuleName="true"
        :status="moduleStatus"
      ></module-edit>
    </div>

    <!-- 高僧 -->
    <div class="history-edit-box">
      <p class="title">历代高僧</p>
      <p class="tips">高僧</p>

      <text-edit :textList="monkList"></text-edit>
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
    }
  },
  created() {
    this.getHistoryModule()
    this.getMonk()
  },
  methods: {
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
     * 获取初始化页面数据
     */
    getMonk() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_BUDDHISM_MONK
      })
        .then(req => {
          if (req.status === 200) {
            // console.log(req.data)
            this.monkList = req.data
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
