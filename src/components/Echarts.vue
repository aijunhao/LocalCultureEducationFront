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
    // 点击事件
    myChart.on('click', (params) => {
      // 提交 mutation 更新 vuex 中的选中项
      this.$store.commit('SELECT_ECHARTS', {
        // 图序号
        index: this.index,
        // 选中项名称
        name: params.name,
        // 第几个组件
        componentIndex: params.componentIndex
      })
    })
    window.addEventListener('resize', () => {
      // 页面监听，自适应图表
      myChart.resize()
    })
  },
  /**
   * option: 参数
   * index: 图表点击事件序号
   */
  props: ['option', 'height', 'width', 'index']
}
</script>
