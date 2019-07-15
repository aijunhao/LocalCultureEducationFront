<template>
  <div id="guanyin" ref="guanyin">
    <carousel :imgList="imgList"></carousel>
  </div>
</template>

<script>
import config from '../../config'
import carousel from '../../components/Carousel'

export default {
  components: {
    carousel
  },
  data() {
    return {
      imgList: ''
    }
  },
  methods: {
    /**
     * 获取轮播图数据
     */
    getCarousel() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_HOME_CAROUSEL
      })
        .then(data => {
          this.imgList = data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getCarousel()
  }
}
</script>
