<template>
  <div id="echarts" ref="echarts"></div>
</template>

<script>
// 导入百度地图
import 'echarts/extension/bmap/bmap'

export default {
  data() {
    return {
      option: {
        bmap: {
          // 地图中心位置
          center: [120.76, 30.77],
          // 放大级别,
          zoom: 7,
          // 是否支持鼠标滚轮
          roam: true
        },
        series: [
          {
            // 类型类型
            type: 'effectScatter',
            // 坐标系类型，百度地图
            coordinateSystem: 'bmap',
            // 数据：value: [经度，纬度，值]
            data: [{ value: [120.76, 30.77, 100] }],
            // 标记大小
            symbolSize: 10,
            // 何时显示特效，绘制完成后显示特效。
            showEffectOn: 'render',
            // 涟漪特效
            rippleEffect: {
              // 波纹的绘制方式，可选 'stroke' 和 'fill'。
              brushType: 'stroke'
            },
            // 鼠标覆盖效果
            hoverAnimation: true,
            // 图形样式
            itemStyle: {
              normal: {
                color: 'purple',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            }
          }
        ]
      }
    }
  },
  mounted() {
    // 初始化 echarts
    var myChart = this.$echarts.init(this.$refs.echarts)
    // 配置属性
    myChart.setOption(this.option, true)
    window.addEventListener('resize', () => {
      // 页面监听，自适应图表
      myChart.resize()
    })
  }
}
</script>

<style lang="stylus">
#echarts
  width 100%
  height 650px
</style>
