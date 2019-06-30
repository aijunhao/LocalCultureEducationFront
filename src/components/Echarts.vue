<template>
  <div :style="{height: height + 'px', width: width + 'px'}" id="echarts" ref="echarts"></div>
</template>

<script>
// 导入百度地图
import 'echarts/extension/bmap/bmap'
// 导入 echarts 中国地图
import '../../node_modules/echarts/map/js/china'
// 导入 echarts 浙江地图
import '../../node_modules/echarts/map/js/province/zhejiang'

export default {
  mounted() {
    // 初始化 echarts
    var myChart = this.$echarts.init(this.$refs.echarts)
    // 配置属性
    myChart.setOption(this.option, true)
    window.addEventListener('resize', () => {
      // 页面监听，自适应图表
      myChart.resize()
    })
  },
  props: ['option', 'height', 'width']
}
</script>
