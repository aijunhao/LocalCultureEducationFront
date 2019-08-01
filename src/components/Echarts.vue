<template>
  <div :style="style" ref="echarts"></div>
</template>

<script>
// 导入百度地图
import 'echarts/extension/bmap/bmap'
// 导入 echarts 中国地图
import '../../node_modules/echarts/map/js/china'
// 导入 echarts 浙江地图
import '../../node_modules/echarts/map/js/province/zhejiang'

export default {
  /**
   * option: 参数
   */
  props: {
    // 闭包对象，保证其可实现
    option: {
      type: Object,
      default() {
        return {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [120, 200, 150, 80, 70, 110, 130],
              type: 'bar'
            }
          ]
        }
      }
    },
    height: {
      type: String,
      default: '300px'
    },
    width: {
      type: String,
      default: '100%'
    }
  },
  data() {
    return {
      myChart: ''
    }
  },
  computed: {
    style() {
      return {
        height: this.height,
        width: this.width
      }
    }
  },
  mounted() {
    // 初始化 echarts
    this.myChart = this.$echarts.init(this.$refs.echarts)
    // 配置属性
    this.myChart.setOption(this.option, true)
    // 点击事件
    this.myChart.on('click', params => {
      this.$emit('echartsSelect', params)
    })
  },
  created() {
    window.addEventListener('resize', () => {
      // 页面监听，自适应图表
      this.myChart.resize()
    })
  },
  watch: {
    // 深度监听 option
    option: {
      handler(newVal, oldVal) {
        this.myChart.setOption(this.option, true)
      },
      deep: true
    }
  },
}
</script>
