<template>
  <div id="echarts" ref="echarts"></div>
</template>

<script>
// 导入 echarts 浙江地图
import '../../node_modules/echarts/map/js/province/zhejiang'

export default {
  data() {
    return {
      option: {
        series: [
          {
            name: '浙江',
            type: 'map',
            mapType: '浙江',
            label: {
              normal: {
                //显示省份标签
                show: true
              },
              emphasis: {
                //对应的鼠标悬浮效果
                show: true
              }
            },
            itemStyle: {
              normal: {
                label: {
                  //默认是否显示省份名称
                  show: false
                },
                areaStyle: {
                  //默认的地图板块颜色
                  color: '#909399'
                },
                borderWidth: 1,
                // 边框颜色
                borderColor: '#909399'
              },
              emphasis: {
                label: {
                  //选中状态是否显示省份名称
                  show: true
                },
                areaStyle: {
                  //选中状态的地图板块颜色
                  color: '#90c31d'
                }
              }
            },
            //此为加载的数据
            data: [
              {
                name: '嘉兴市',
                selected: true,
                value: 10
              }
            ]
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
