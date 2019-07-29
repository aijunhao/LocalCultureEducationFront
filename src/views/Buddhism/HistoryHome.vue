<template>
  <div id="historyhome">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item>普陀编年史</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 介绍文字 -->
    <div class="historyhome-overview">这里预计需要一段全局介绍</div>

    <module
      :direction="i % 2 ? true : false"
      :key="i"
      :module="item"
      v-for="(item, i) in historyHomeContent"
    ></module>
  </div>
</template>

<script>
import config from '../../config'
import module from '../../components/Module'

export default {
  data() {
    return {
      historyHomeContent: ''
    }
  },
  components: {
    module
  },
  methods: {
    /**
     * 获取内容
     */
    getHistoryHomeContent() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HISTORY_HOME
      })
        .then(req => {
          if (req.status === 200) this.historyHomeContent = req.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getHistoryHomeContent()
  }
}
</script>

<style lang="stylus">
#historyhome
  .historyhome-overview
    height 300px
    background #ffffff
    margin-bottom 20px

@media screen and (min-width: 960px)
  #historyhome
    padding 20px 15%
</style>
