<template>
  <div id="location">
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item>地理环境</el-breadcrumb-item>
    </el-breadcrumb>

    <divider :title="'地图'" :icon="'iconchinamap-chart'"></divider>

    <!-- 地图及描述 -->
    <div class="location-show">
      <!-- 地图 -->
      <div class="location-show-map">
        <el-radio-group @change="jumpTo" class="location-show-map-radio" v-model="radio">
          <el-radio-button label="0">省级</el-radio-button>
          <el-radio-button label="1">市级</el-radio-button>
          <el-radio-button label="2">详细</el-radio-button>
        </el-radio-group>
        <router-view></router-view>
      </div>

      <!-- 描述 -->
      <div class="location-show-description">
        <template v-if="mapInfo && mapInfo.length != 0">
          <p class="title" v-text="mapInfo[radio].title"></p>
          <div class="indent" v-html="mapInfo[radio].content"></div>
        </template>
        <p class="tips" v-else>内容加载失败，请稍后再试</p>
      </div>
    </div>

    <divider :title="'地质地貌'" :icon="'icondizhihuanjing-'"></divider>

    <!-- 地质地貌 -->
    <div class="location-content direction">
      <template v-if="geologyInfo && geologyInfo.length != 0">
        <div class="location-content-echarts">
          <echarts
            :height="'350px'"
            :option="geologyOption"
            :width="'350px'"
            @echartsSelect="geologySelect"
          ></echarts>
        </div>
        <div class="location-content-main">
          <p class="indent" v-text="geologyInfo.overview.content"></p>
          <p
            class="location-content-main-title"
            v-text="geologyInfo.areaList[geologyAreaSelected].title"
          >面积占比名称</p>
          <p
            class="indent"
            v-text="geologyInfo.areaList[geologyAreaSelected].content"
          >点击左侧图表可在此处查看详细信息</p>
          <p
            class="location-content-main-title"
            v-text="geologyInfo.coastlineList[geologyCoastlineSelected].title"
          >海岸线占比名称</p>
          <p
            class="indent"
            v-text="geologyInfo.coastlineList[geologyCoastlineSelected].content"
          >点击左侧图表可在此处查看详细信息</p>
        </div>
      </template>
      <p class="tips" v-else>内容加载失败，请稍后再试</p>
    </div>

    <divider :title="'植被信息'" :icon="'iconzhiwu'"></divider>

    <!-- 植被信息 -->
    <div class="location-content">
      <template v-if="plantInfo && plantInfo.length != 0">
        <div class="location-content-echarts">
          <echarts
            :height="'350px'"
            :option="plantOption"
            :width="'350px'"
            @echartsSelect="plantSelect"
          ></echarts>
        </div>
        <div class="location-content-main">
          <p class="indent" v-text="plantInfo.overview.content"></p>
          <p
            class="location-content-main-title"
            v-text="plantInfo.plantList[plantSelected].title"
          >植物类别</p>
          <p class="indent" v-text="plantInfo.plantList[plantSelected].content">点击左侧图表可在此处查看详细信息</p>
        </div>
      </template>
      <p class="tips" v-else>内容加载失败，请稍后再试</p>
    </div>
  </div>
</template>

<script>
import echarts from '../components/Echarts'
import config from '../config'
import { mapGetters, mapState } from 'vuex'
import divider from '../components/Divider'

export default {
  data() {
    return {
      // 选择按钮
      radio: 0,
      // 地图描述信息
      mapInfo: [],
      // 植被数据
      plantInfo: [],
      // 植被信息选中项
      plantSelected: 0,
      // 地质数据
      geologyInfo: [],
      geologyAreaSelected: 0,
      geologyCoastlineSelected: 0,
      coastlineSeries: [],
      areaSeries: [],
      geologyLegend: [],
      plantSeries: [],
      plantLegend: [],

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
          left: 'left',
          bottom: 10,
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
          left: 'right',
          top: 30,
          data: []
        },
        series: [
          {
            name: '植被覆盖率',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '60%'],
            center: ['45%', '55%'],
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
  methods: {
    /**
     * echarts 地质选中
     */
    geologySelect(params) {
      // console.log(params.name, params.color)
      if (params.componentIndex === 0)
        for (var i = 0; i < this.coastlineSeries.length; i++) {
          if (params.name === this.coastlineSeries[i].name) {
            this.geologyCoastlineSelected = i
            return
          }
        }
      else
        for (var i = 0; i < this.areaSeries.length; i++) {
          if (params.name === this.areaSeries[i].name) {
            this.geologyAreaSelected = i
            return
          }
        }
    },
    /**
     * echarts 植被选中
     */
    plantSelect(params) {
      // console.log(params.name, params.color)
      for (var i = 0; i < this.plantSeries.length; i++) {
        if (params.name === this.plantSeries[i].name) {
          this.plantSelected = i
          return
        }
      }
    },
    /**
     * 获取地图介绍信息
     */
    getLocationInfo() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_MAP_INFO
      })
        .then(req => {
          if (req.status === 200) {
            this.mapInfo = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取图表信息
     */
    getLocationChartData() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_LOCATION_Chart_DATA_INFO
      })
        .then(req => {
          if (req.status === 200) {
            console.log(req.data)

            // 植被信息
            this.plantInfo = req.data.plant
            this.geologyInfo = req.data.geology
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 路由跳转
     */
    jumpTo(value) {
      if (value === '0') {
        this.$router.push('/location/chinamap')
      } else if (value === '1') {
        this.$router.push('/location/zhejiangmap')
      } else if (value === '2') {
        this.$router.push('/location/baidumap')
      }
    }
  },
  components: {
    echarts, divider
  },
  created() {
    // 获取信息
    this.getLocationInfo()
    this.getLocationChartData()
  },
  watch: {
    geologyInfo: {
      handler(newVal, oldVal) {
        newVal.coastlineList.forEach(element => {
          this.coastlineSeries.push({
            value: element.data,
            name: element.title,
            itemStyle: {
              color: element.color
            }
          })

          this.geologyLegend.push(element.title)
        })

        newVal.areaList.forEach(element => {
          this.areaSeries.push({
            value: element.data,
            name: element.title,
            itemStyle: {
              color: element.color
            }
          })

          this.geologyLegend.push(element.title)
        })

        // 拼接地质图表数据
        this.geologyOption.series[0].data = this.coastlineSeries
        this.geologyOption.series[1].data = this.areaSeries
        this.geologyOption.legend.data = this.geologyLegend
        this.geologyOption.title.text = newVal.overview.title
      },
      deep: true
    },
    plantInfo: {
      handler(newVal, oldVal) {
        newVal.plantList.forEach(element => {
          this.plantSeries.push({
            value: element.data,
            name: element.title,
            itemStyle: {
              color: element.color
            }
          })

          this.plantLegend.push(element.title)
        })

        // 拼接植被图表数据
        this.plantOption.series[0].data = this.plantSeries
        this.plantOption.legend.data = this.plantLegend
        this.plantOption.title.text = newVal.overview.title
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus">
#location
  .indent
    text-indent 2rem

  .tips
    font-size 0.9rem
    color #909399
    text-align center

  .location-show-description
    box-sizing border-box
    background #fff
    border-radius 5px
    padding 20px

    .title
      font-weight 600
      margin 0

  .location-show-map
    position relative

    .location-show-map-radio
      position absolute
      margin-top 10px
      right 10px
      z-index 50

  .location-content
    .location-content-echarts
      display flex
      display -webkit-flex
      justify-content center

    .location-content-main
      background #fff
      border-radius 5px

      .location-content-main-title
        font-weight 600

// pc
@media screen and (min-width: 960px)
  #location
    padding 0 15%

    .breadcrumb
      line-height 64px

    .direction
      flex-direction row-reverse

    .location-show
      display flex
      display -webkit-flex
      justify-content space-between
      padding-bottom 20px

      .location-show-description
        width 30%
        min-width 200px
        max-height 550px
        overflow auto

        .title
          font-size 1.2rem
          font-weight 600
          margin 0

      .location-show-map
        width 70%

    .location-content
      display flex
      display -webkit-flex
      justify-content space-between

      .location-content-main
        box-sizing border-box
        padding 20px
        height 350px
        overflow-y auto
        width calc(100% - 400px)

// mobile
@media screen and (max-width: 960px)
  #location
    padding 10px
    font-size 0.8rem

    .breadcrumb
      line-height 64px

    .location-content
      margin 20px 0

      .location-content-main
        box-sizing border-box
        padding 10px
</style>
