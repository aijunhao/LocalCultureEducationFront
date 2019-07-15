<template>
  <div id="carousel" ref="carousel">
    <el-carousel :height="carouselHeight + 'px'">
      <el-carousel-item :key="i" v-for="(item, i) in imgList">
        <img :src="item.img"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: ['imgList'],
  data() {
    return {
      // 轮播图大小
      carouselHeight: ''
    }
  },
  methods: {
    // 重载轮播图高度
    imgLoad() {
      this.$nextTick(() => {
        this.carouselHeight = this.$refs.carousel.clientWidth / 2
      })
    }
  },
  mounted() {
    this.imgLoad()
    window.onresize = () => {
      this.imgLoad()
    }
  }
}
</script>

<style lang="stylus">
#carousel img
  width 100%
  height 100%
</style>
