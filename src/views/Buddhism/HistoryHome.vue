<template>
  <div id="historyhome">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item>普陀编年史</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 介绍文字 -->
    <div class="historyhome-overview">普陀山原名梅岑山，因西汉末年梅福在此修道而得名。唐咸通四年（863年），日本高僧慧锷从五台山请得观音神像回国，途经莲花洋遇风涛，以为观音不肯去日本，便留下神像，称不肯去观音。五代梁朝贞明二年（916年）建不肯去观音院。宋元丰三年（1080年）朝廷赐银，改建为宝陀观音寺，从此香火兴盛。南宋嘉定七年（1214年），钦定为观音道场，并根据佛经补怛洛迦，更山名为普陀洛迦山，亦称补陀洛迦山。明朝时，把莲花洋南的一小岛称洛迦山，就有了普陀山和洛迦山两个山名。</div>

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
    margin-bottom 20px
    text-indent 2rem

@media screen and (min-width: 960px)
  #historyhome
    padding 20px 15%
</style>
