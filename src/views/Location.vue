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
        <p>{{ description.title }}</p>
        <p>{{ description.content[radio] }}</p>
      </div>
    </div>

    <!-- 地质地貌 -->
    <div class="location-geology">
      <div>
        <p>普陀山风景名胜区地质属古华夏褶皱带浙东沿海地带，形成于1亿5千万年前侏罗——白垩纪，燕山运动晚期的侵入花岗构成岩石基础。其地貌因受第三纪新构造运动地壳间歇上升及第四纪冰期、间冰期海蚀作用影响，可分为山地、海蚀海积阶地、海积地、海蚀地区类。</p>
        <div class="space-between">
          <echarts :height="500" :option="option" :width="500"></echarts>
          <div>
            <div>
              <p>山地</p>
            </div>
            <div>
              <p>海蚀地</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from '../components/Echarts'

export default {
  data() {
    return {
      // 选择按钮
      radio: 0,
      // 地图描述
      description: {
        title: '普陀山风景区',
        content: [
          '普陀山，国家5A级旅游景区，国家首批重点风景名胜区，全国文明风景旅游区示范点，全国保护旅游消费者权益示范单位，ISO14000国家示范区，全球优秀生态旅游景区，中国佛教四大名山之一。',
          '普陀山位于浙江杭州湾以东莲花洋，钱塘江口、舟山群岛东南部海域，景区包括普陀山、洛迦山、朱家尖，总面积41.95平方公里，其中普陀山本岛12.5平方公里，最高峰佛顶山海拔292米。普陀山既有悠久的佛教文化，又有丰富的海岛风光，古人称之为"海天佛国"、"南海圣境"、"人间第一清静境"。',
          '普陀山位于杭州湾南缘、舟山群岛东部海域，处北纬29°58′3~30°02′3，东经122°21′6~122°24′9。西南距沈家门渔港6.5公里，南距朱家尖岛2.5公里，东濒瀚海。行政区由普陀山、洛迦山、南山、小山洞、豁沙山、小洛迦山等小岛组成，隶舟山市普陀区'
        ]
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
            radius: [0, '40%'],
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
              { value: 22, name: '海积地' },
              { value: 14, name: '砾石滩' },
              { value: 20, name: '泥滩' },
              { value: 44, name: '海蚀地' }
            ]
          },
          {
            name: '所占面积',
            type: 'pie',
            selectedMode: 'single',
            radius: ['50%', '70%'],
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
              { value: 8, name: '其他' }
            ]
          }
        ]
      }
    }
  },
  methods: {
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
      margin 20px
      padding 20px

// mobile
@media screen and (max-width: 960px)
  #location
    .location-show-description
      margin 5px
</style>
