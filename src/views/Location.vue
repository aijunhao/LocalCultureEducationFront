<template>
  <div id="location">
    <!-- 面包屑 -->
    <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item>地理环境</el-breadcrumb-item>
    </el-breadcrumb>

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
        <template v-if="mapInfo.length != 0">
          <p class="title" v-text="mapInfo[radio].title"></p>
          <div class="indent" v-html="mapInfo[radio].content"></div>
        </template>
        <p class="tips" v-else>内容加载失败，请稍后再试</p>
      </div>
    </div>

    <!-- 地质地貌 -->
    <div class="location-content direction">
      <template v-if="geologyInfo.length != 0">
        <div class="location-content-echarts">
          <echarts
            :height="'350px'"
            :index="1"
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

    <!-- 植被信息 -->
    <div class="location-content">
      <template v-if="plantInfo.length != 0">
        <div class="location-content-echarts">
          <echarts
            :height="'350px'"
            :index="2"
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
      if (params.componentIndex === 0)
        for (var i = 0; i < this.geologyInfo.coastlineSeries.length; i++) {
          if (params.name === this.geologyInfo.coastlineSeries[i].name) {
            this.geologyCoastlineSelected = i
            return
          }
        }
      else
        for (var i = 0; i < this.geologyInfo.areaSeries.length; i++) {
          if (params.name === this.geologyInfo.areaSeries[i].name) {
            this.geologyAreaSelected = i
            return
          }
        }
    },
    /**
     * echarts 植被选中
     */
    plantSelect(params) {
      for (var i = 0; i < this.plantInfo.series.length; i++) {
        if (params.name === this.plantInfo.series[i].name) {
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
            this.mapInfo = req.data.mapInfo

            // 植被信息
            this.plantInfo = req.data.plant
            this.geologyInfo = req.data.geology

            // 拼接植被图表数据
            this.plantOption.series[0].data = req.data.plant.series
            this.plantOption.legend.data = req.data.plant.legend
            this.plantOption.title.text = req.data.plant.overview.title

            // 拼接地质图表数据
            this.geologyOption.series[0].data = req.data.geology.coastlineSeries
            this.geologyOption.series[1].data = req.data.geology.areaSeries
            this.geologyOption.legend.data = req.data.geology.legend
            this.geologyOption.title.text = req.data.geology.overview.title

            // console.log(req.data)
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
    echarts
  },
  created() {
    // 获取信息
    this.getLocationInfo()
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
      font-size 1.5rem
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
        width 20%
        min-width 300px

        .title
          font-size 1.5rem
          font-weight 600
          margin 0

      .location-show-map
        width 80%
        min-width 600px

    .location-content
      padding 50px 0
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
