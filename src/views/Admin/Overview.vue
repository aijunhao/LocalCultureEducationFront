<template>
  <div id="overview">
    <echarts :height="300" :option="option"></echarts>
  </div>
</template>

<script>
import ECharts from '../../components/Echarts'


export default {
  components: {
    echarts: ECharts
  },
  data() {
    return {
      option: {
        title: {
          text: '网站访问量折线图'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['管理员', '用户']
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '管理员',
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'line'
          },
          {
            name: '用户',
            data: [10, 20, 15, 8, 7, 11, 13],
            type: 'line'
          }
        ]
      }
    }
  }
}
</script>