<template>
  <div id="location_edit">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>地理环境</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 地图介绍 -->
    <div class="location-edit-box anchor-class" id="history_edit_home">
      <p class="title">地理环境</p>
      <p class="tips">介绍</p>

      <div>介绍</div>
    </div>

    <!-- 图表 -->
    <div class="location-edit-box anchor-class" id>
      <p class="title">地质地貌统计</p>
      <p class="tips">介绍</p>

      <div class="echarts-box">
        <echarts :height="'350px'" :option="geologyOption" :width="'80%'"></echarts>
      </div>

      <p>海岸线比例（内圈）</p>
      <hr />
      <echats-info-edit :infoList="geologyInfo.coastlineList"></echats-info-edit>

      <p>占地面积比例（外圈）</p>
      <hr />
      <echats-info-edit :infoList="geologyInfo.areaList"></echats-info-edit>
    </div>

    <div class="location-edit-box anchor-class" id>
      <p class="title">地理环境</p>
      <p class="tips">介绍</p>

      <div class="echarts-box">
        <echarts :height="'350px'" :option="plantOption" :width="'80%'"></echarts>
      </div>
      <echats-info-edit :infoList="plantInfo.plantList"></echats-info-edit>
    </div>
  </div>
</template>

<script>
import EchartsInfoEdit from '../../components/EchartsInfoEdit'
import Echarts from '../../components/Echarts'
import config from '../../config'

export default {
  components: {
    'echats-info-edit': EchartsInfoEdit,
    echarts: Echarts
  },
  data() {
    return {
      // 地图描述信息
      mapInfo: [],
      // 植被数据
      plantInfo: [],
      // 地质数据
      geologyInfo: [],
      // 地质地貌 echarts 参数
      geologyOption: {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'middle',
          data: []
        },
        series: [
          {
            name: '海岸线比例',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '35%'],
            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          },
          {
            name: '面积比例',
            type: 'pie',
            selectedMode: 'single',
            radius: ['45%', '65%'],
            label: {
              normal: {
                position: 'inner'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: []
          }
        ]
      },
      // 植被信息 echarts 参数
      plantOption: {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} 亩'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          top: 'middle',
          data: []
        },
        series: [
          {
            name: '植被覆盖率',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '65%'],
            center: ['50%', '60%'],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: []
          }
        ]
      }
    }
  },
  created() {
    this.getLocationChartData()
  },
  methods: {
    /**
     * 获取地图介绍信息
     */
    getLocationChartData() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_LOCATION_Chart_DATA_INFO
      })
        .then(req => {
          if (req.status === 200) {
            // 植被信息
            this.plantInfo = req.data.plant
            this.geologyInfo = req.data.geology
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  watch: {
    geologyInfo: {
      handler(newVal, oldVal) {
        let coastlineSeries = []
        let areaSeries = []
        let legend = []

        newVal.coastlineList.forEach(element => {
          coastlineSeries.push({
            value: element.data,
            name: element.title,
            itemStyle: {
              color: element.color
            }
          })

          legend.push(element.title)
        })

        newVal.areaList.forEach(element => {
          areaSeries.push({
            value: element.data,
            name: element.title,
            itemStyle: {
              color: element.color
            }
          })

          legend.push(element.title)
        })

        // 拼接地质图表数据
        this.geologyOption.series[0].data = coastlineSeries
        this.geologyOption.series[1].data = areaSeries
        this.geologyOption.legend.data = legend
        this.geologyOption.title.text = newVal.overview.title
      },
      deep: true
    },
    plantInfo: {
      handler(newVal, oldVal) {
        let plantSeries = []
        let legend = []

        newVal.plantList.forEach(element => {
          plantSeries.push({
            value: element.data,
            name: element.title,
            itemStyle: {
              color: element.color
            }
          })

          legend.push(element.title)
        })

        // 拼接植被图表数据
        this.plantOption.series[0].data = plantSeries
        this.plantOption.legend.data = legend
        this.plantOption.title.text = newVal.overview.title
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus">
#location_edit
  .location-edit-box
    background #fff
    padding 50px
    margin-bottom 20px

  .echarts-box
    display -webkit-flex
    display flex
    justify-content center

  .title
    font-size 1.5rem
    font-weight 600
    margin 0

  .tips
    font-size 0.9rem
    color #909399
</style>
