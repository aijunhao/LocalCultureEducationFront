<template>
  <div id="scenery">
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
</style>
