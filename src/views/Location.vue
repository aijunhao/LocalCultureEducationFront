<template>
  <div id="location">
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
        <p>{{ initMessage.mapDescription.title }}</p>
        <p>{{ initMessage.mapDescription.content[radio] }}</p>
      </div>
    </div>

    <!-- 地质地貌 -->
    <div class="location-geology">
      <div class="location-geology-echarts">
        <echarts :height="350" :index="1" :option="option" :width="350"></echarts>
      </div>
      <div class="location-geology-main">
        <p>{{ geologyOverView }}</p>
        <p v-text="geologyAreaSelected.name">面积占比名称</p>
        <p v-text="geologyAreaSelected.content">点击左侧图表可在此处查看详细信息</p>
        <p v-text="geologyLineSelected.name">海岸线占比名称</p>
        <p v-text="geologyLineSelected.content">点击左侧图表可在此处查看详细信息</p>
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
      // 初始化数据
      initMessage: {
        // 地图描述
        mapDescription: {
          title: '',
          content: ['']
        }
      },
      // 地质地貌 echarts 参数
      option: {
        title: {
          text: '地质地貌统计图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {d}%'
        },
        legend: {
          left: 'center',
          bottom: 10,
          data: ['山地', '海蚀海积阶地', '海积地', '砾石滩', '泥滩', '海蚀地']
        },
        series: [
          {
            name: '海岸线比例',
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
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
            radius: ['40%', '60%'],
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
      }
    }
  },
  methods: {
    /**
     * 获取 location 初始化信息
     */
    locationInit() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_LOCATION_INIT
      })
        .then(data => {
          this.initMessage = data.data
          // 将 geology 存储到 vuex 中
          this.$store.commit('SET_GEOLOGY', data.data.geology)
          // 初始化选中项
          this.$store.commit('SELECT_ECHARTS', {
            index: 1,
            name: '海积地',
            componentIndex: 0
          })
          // 初始化选中项
          this.$store.commit('SELECT_ECHARTS', {
            index: 1,
            name: '其他',
            componentIndex: 1
          })
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
    this.locationInit()
  },
  computed: {
    ...mapState({
      geologyOverView: state => state.geology.overview,
      geologyAreaSelected: state => state.geologyAreaSelected,
      geologyLineSelected: state => state.geologyLineSelected
    })
  }
}
</script>

<style lang="stylus">
#location
  margin-top 100px

  .space-between
    display flex
    display -webkit-flex
    justify-content space-between

  .location-show-description
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

  .location-geology
    padding 50px 0

    .location-geology-echarts
      display flex
      justify-content center

    .location-geology-main
      width 100%
      background #fff
      padding 10px
      border-radius 5px

// pc
@media screen and (min-width: 960px)
  #location
    margin-top 100px

    .location-show
      display flex
      display -webkit-flex
      justify-content space-between
      margin 0 15px

      .location-show-description
        background #fff
        border-radius 5px
        padding 20px
        width 20%
        min-width 300px

        p:first-child
          font-size 1.5rem
          font-weight 600
          margin 0

      .location-show-map
        width 80%
        min-width 600px

    .location-geology
      padding 50px 15%
      display flex
      display -webkit-flex
      justify-content space-between

      .location-geology-main
        margin-left 5%
        background #fff
        padding 10px
        border-radius 5px

// mobile
@media screen and (max-width: 960px)
  #location
    padding 10px
</style>
