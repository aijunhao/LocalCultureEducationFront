<template>
  <div id="culturehome">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item>佛国文化</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 介绍文字 -->
    <div class="culturehome-overview">曾经有这样的诗句用来形容普陀山，"海上有仙山，山在虚无缥缈间"，普陀山以其神奇、神圣、神秘，成为驰誉中外的旅游胜地。有普陀山佛教博物馆，是迄今为止我国宗教界自办的首个宗教博物馆；有观音传说、观音文化节、佛茶等非物质文化遗产举世瞩目；更有观音法界，实乃中国佛教第一圣地。</div>

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
    margin-bottom 20px
    text-indent 2rem

@media screen and (min-width: 960px)
  #culturehome
    padding 20px 15%

@media screen and (max-width: 960px)
  #culturehome
    padding 10px
</style>
