<template>
  <div id="culturehome">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item>佛国文化</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 介绍文字 -->
    <div class="culturehome-overview">这里预计需要一段全局介绍</div>

    <module
      :direction="i % 2 ? true : false"
      :key="i"
      :module="item"
      v-for="(item, i) in cultureHomeContent"
    ></module>
  </div>
</template>

<script>
import config from '../../config'
import module from '../../components/Module'

export default {
  data() {
    return {
      cultureHomeContent: ''
    }
  },
  components: {
    module
  },
  methods: {
    /**
     * 获取内容
     */
    getCultureHomeContent() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_CULTURE_HOME
      })
        .then(req => {
          if (req.status === 200) this.cultureHomeContent = req.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getCultureHomeContent()
  }
}
</script>


<style lang="stylus">
#culturehome
  .culturehome-overview
    height 300px
    background #ffffff
    margin-bottom 20px

@media screen and (min-width: 960px)
  #culturehome
    padding 20px 15%

@media screen and (max-width: 960px)
  #culturehome
    padding 10px
</style>
