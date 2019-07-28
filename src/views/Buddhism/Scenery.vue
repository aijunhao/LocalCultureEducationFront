<template>
  <div id="scenery">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buddhism/buddhismhome'}">海天佛国</el-breadcrumb-item>
      <el-breadcrumb-item>普陀山水</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 普陀十二景 -->
    <image-list :imageList="twelveScenery" :title="'普陀十二景'"></image-list>

    <!-- 其他图片 -->
    <image-list :imageList="otherScenery"  :title="'更多风光'"></image-list>
  </div>
</template>

<script>
import ImageList from '../../components/ImageList'
import config from '../../config'

export default {
  data() {
    return {
      twelveScenery: '',
      otherScenery: ''
    }
  },
  components: {
    'image-list': ImageList
  },
  created() {
    this.getTwelveScenery()
    this.getMore()
  },
  methods: {
    /**
     * 获取普陀十二景
     */
    getTwelveScenery() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_TWELVE_SCENERIES
      })
        .then(data => {
          this.twelveScenery = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取其他图片
     */
    getMore() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_NATURE_INIT
      })
        .then(data => {
          console.log(data)
          this.otherScenery = data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="stylus">
@media screen and (min-width: 960px)
  #scenery
    padding 20px 15%

@media screen and (max-width: 960px)
  #scenery
    padding 10px
</style>
