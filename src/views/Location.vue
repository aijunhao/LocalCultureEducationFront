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
          <el-radio-button label="0">中国地图</el-radio-button>
          <el-radio-button label="1">省份地图</el-radio-button>
          <el-radio-button label="2">百度地图</el-radio-button>
        </el-radio-group>
        <router-view></router-view>
      </div>

      <!-- 描述 -->
      <div class="location-show-description">
        <p class="title">{{ mapDescription[radio].title }}</p>
        <p :key="i" class="indent" v-for="(item, i) in mapDescription[radio].content">{{item}}</p>
      </div>
    </div>

    <!-- 地质地貌 -->
    <div class="location-content direction">
      <div class="location-content-echarts">
        <echarts :height="350" :index="1" :option="geologyOption" :width="350"></echarts>
      </div>
      <div class="location-content-main">
        <p class="indent">{{ geologyOverView }}</p>
        <p class="location-content-main-title" v-text="geologyAreaSelected.name">面积占比名称</p>
        <p class="indent" v-text="geologyAreaSelected.content">点击左侧图表可在此处查看详细信息</p>
        <p class="location-content-main-title" v-text="geologyLineSelected.name">海岸线占比名称</p>
        <p class="indent" v-text="geologyLineSelected.content">点击左侧图表可在此处查看详细信息</p>
      </div>
    </div>

    <!-- 植被信息 -->
    <div class="location-content">
      <div class="location-content-echarts">
        <echarts :height="350" :index="2" :option="plantOption" :width="350"></echarts>
      </div>
      <div class="location-content-main">
        <p class="indent">{{ plantOverView }}</p>
        <p class="location-content-main-title" v-text="plantSelected.name">植物类别</p>
        <p class="indent" v-text="plantSelected.content">点击左侧图表可在此处查看详细信息</p>
      </div>
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
      mapDescription: [
        {
          title: '',
          content: ['']
        }
      ],
      // 初始化数据
      initMessage: {
        // 地图描述
      },
      // 地质地貌 echarts 参数
      geologyOption: {
        title: {
          text: '地质地貌统计图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        legend: {
          left: 'left',
          bottom: 10,
          data: ['山地', '海蚀海积阶地', '海积地', '砾石滩', '泥滩', '海蚀地']
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
            data: [
              { value: 22, name: '海积地', selected: true },
              { value: 14, name: '砾石滩' },
              { value: 20, name: '泥滩' },
              { value: 44, name: '海蚀地' }
            ]
          },
          {
            name: '所占面积',
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
            data: [
              { value: 2, name: '山地' },
              { value: 90, name: '海蚀海积阶地' },
              { value: 8, name: '其他', selected: true }
            ]
          }
        ]
      },
      // 植被信息 echarts 参数
      plantOption: {
        title: {
          text: '植被统计图',
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
          data: [
            '沼生水生植被',
            '木本栽培植被',
            '草本栽培植被',
            '盐生植被',
            '沙生植被',
            '针叶林',
            '阔叶林',
            '竹林',
            '灌丛',
            '草丛'
          ]
        },
        series: [
          {
            name: '普陀山植被统计',
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
            data: [
              { value: 9816, name: '针叶林', selected: true },
              { value: 1011, name: '阔叶林' },
              { value: 180, name: '竹林' },
              { value: 429, name: '灌丛' },
              { value: 429, name: '草丛' },
              { value: 13.5, name: '盐生植被' },
              { value: 133.5, name: '沙生植被' },
              { value: 67.5, name: '沼生水生植被' },
              { value: 169.5, name: '木本栽培植被' },
              { value: 723, name: '草本栽培植被' }
            ]
          }
        ]
      }
    }
  },
  methods: {
    /**
     * 获取 location 初始化信息
     */
    initLocation() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_LOCATION_INIT
      })
        .then(data => {
          console.log(data.data)
          this.mapDescription = data.data.mapDescription
          this.dataCommit(data.data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 将数据存到 vuex 中
     */
    dataCommit(data) {
      // 将 geology 存储到 vuex 中
      this.$store.commit('SET_GEOLOGY', data.geology)
      // 初始化 geology 选中项
      this.$store.commit('SELECT_ECHARTS', {
        index: 1,
        name: '海积地',
        componentIndex: 0
      })
      // 初始化 geology 选中项
      this.$store.commit('SELECT_ECHARTS', {
        index: 1,
        name: '其他',
        componentIndex: 1
      })
      // 将 geology 存储到 vuex 中
      this.$store.commit('SET_PLANT', data.plant)
      // 初始化 plant 选中项
      this.$store.commit('SELECT_ECHARTS', {
        index: 2,
        name: '针叶林',
        componentIndex: 1
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
    this.initLocation()
  },
  computed: {
    ...mapState({
      geologyOverView: state => state.geology.overview,
      geologyAreaSelected: state => state.geologyAreaSelected,
      geologyLineSelected: state => state.geologyLineSelected,
      plantOverView: state => state.plant.overview,
      plantSelected: state => state.plantSelected
    })
  }
}
</script>

<style lang="stylus">
#location
  .indent
    text-indent 2rem

  .location-show-description
    box-sizing border-box
    background #fff
    border-radius 5px
    padding 20px

    p:first-child
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
    padding 20px

    .breadcrumb
      line-height 64px
      padding 0 15%

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

        p:first-child
          font-size 1.5rem
          font-weight 600
          margin 0

      .location-show-map
        width 80%
        min-width 600px

    .location-content
      padding 50px 15%
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
    padding 0 10px

    .breadcrumb
      line-height 64px
      padding 0 10px

    .location-content
      margin 20px 0

      .location-content-main
        box-sizing border-box
        padding 10px
</style>
