<template>
  <div id="carousel" ref="carousel" >
    <el-carousel :height="carouselHeight + 'px'" :indicator-position="showIndicator" arrow="always">
      <el-carousel-item :key="i" v-for="(item, i) in imgList">
        <img :src="item.url" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props: ['imgList', 'showIndicator'],
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
        // 不在当前页面时是没有这个 id 的
        if (document.getElementById('carousel'))
          this.carouselHeight =
            document.getElementById('carousel').clientWidth / 2
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
