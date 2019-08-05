<template>
  <div id="building">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buddhism/buddhismhome'}">海天佛国</el-breadcrumb-item>
      <el-breadcrumb-item>寺庙庵堂</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 水平滚动图片 -->
    <divider :title="'专题图集'" :icon="'iconzhuantituji'"></divider>
    <horizontal-image-list :height="150" :imageList="buildingList" :width="200"></horizontal-image-list>

    <!-- 文章描述 -->
    <divider :title="'文章描述'" :icon="'iconwenzhang'"></divider>
    <article-box :articleList="buildingArticle" v-if="buildingArticle"></article-box>

    <!-- 图表 -->
    <divider :title="'图表'" :icon="'icontubiao'"></divider>
    <echarts :height="echartsHeight" :option="option"></echarts>
  </div>
</template>

<script>
import config from '../../config'
import echarts from '../../components/Echarts'
import HorizontalImageList from '../../components/HorizontalImageList'
import ArticleBox from '../../components/ArticleBox'
import divider from '../../components/Divider'

export default {
  data() {
    return {
      buildingList: '',
      buildingArticle: [],
      echartsHeight: '300px',
      option: {
        title: {
          text: '普陀山千年寺庙庵堂数量变更图',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['寺', '庵堂', '总数'],
          left: 0,
          top: 25
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: [
            916,
            1080,
            1131,
            1276,
            1465,
            1572,
            1574,
            1577,
            1580,
            1586,
            1605,
            1671,
            1832,
            1924,
            1927,
            1952,
            1964,
            1978,
            2016
          ]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '寺',
            type: 'line',
            stack: '总量',
            data: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 3, 4]
          },
          {
            name: '庵堂',
            type: 'line',
            stack: '总量',
            data: [
              0,
              0,
              1,
              2,
              3,
              2,
              3,
              3,
              3,
              53,
              103,
              190,
              188,
              88,
              90,
              83,
              74,
              64,
              43
            ]
          },
          {
            name: '总数',
            type: 'line',
            stack: '总量',
            data: [
              1,
              2,
              3,
              4,
              5,
              4,
              5,
              5,
              5,
              55,
              106,
              193,
              191,
              91,
              93,
              86,
              77,
              67,
              47
            ]
          }
        ]
      }
    }
  },
  methods: {
    /**
     * 获取寺庙庵堂图片
     */
    getBuilding() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_BUILDING
      })
        .then(req => {
          // console.log(data.data)
          if (req.status === 200) this.buildingList = req.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取寺庙庵堂文章
     */
    getBuildingArticle() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_BUILDING_ARTICLE
      })
        .then(req => {
          // console.log(data.data)
          if (req.status === 200) this.buildingArticle = req.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getBuilding()
    this.getBuildingArticle()
  },
  components: {
    echarts,
    'horizontal-image-list': HorizontalImageList,
    'article-box': ArticleBox,
    divider
  }
}
</script>

<style lang="stylus">
#building
  .building-description
    margin 50px 0

    p
      text-indent 2rem

      &:nth-child(1)
        font-weight 600
        text-align center

      &:nth-child(2)
        display flex
        display -webkit-flex
        justify-content space-around

@media screen and (min-width: 960px)
  #building
    padding 20px 15%

    .building-description
      p:nth-child(1)
        font-size 1.2rem

@media screen and (max-width: 960px)
  #building
    padding 10px

    .building-description
      p
        font-size 0.8rem

        &:nth-child(1)
          font-size 1.2rem
</style>
