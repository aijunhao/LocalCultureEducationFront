<template>
  <echarts :option="option" :height="550"></echarts>
</template>

<script>
import echarts from "./Echarts"

export default {
  data() {
    return {
      option: {
        bmap: {
          // 地图中心位置
          center: [122.4, 30],
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
            data: [{ value: [122.4, 30, 100] }],
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
  components: {
    echarts
  }
}
</script>
