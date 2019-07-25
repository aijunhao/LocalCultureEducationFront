<template>
  <div id="building">
    <!-- 水平滚动图片 -->
    <horizontal-image-list
      :height="150"
      :imageList="buildingList"
      :width="200"
      @select="selectBuilding"
    ></horizontal-image-list>

    <!-- 文章描述 -->
    <div class="building-description">
      <p v-text="description.title">标题</p>
      <p>
        <span>作者：{{ description.author }}</span>
        <span>来源：{{ description.source }}</span>
      </p>
      <p :key="i" v-for="(item, i) in description.content">{{item}}</p>
    </div>

    <!-- 图表 -->
    <echarts :height="echartsHeight" :option="option"></echarts>
  </div>
</template>

<script>
import config from '../../config'
import echarts from '../../components/Echarts'
import HorizontalImageList from '../../components/HorizontalImageList'

export default {
  data() {
    return {
      buildingList: '',
      echartsHeight: '300',
      description: {
        title: '普陀山寺院概况',
        img: '',
        time: '2016-09-13',
        author: '普陀山佛教协会',
        source: '普陀山佛教协会',
        content: [
          '据历代《山志》记载，普陀山寺院始建于后梁贞明二年（916），在张氏宅基建“不肯去观音院”。至宋元丰三年（1080），赐额宝陀观音寺，发展为今普济禅寺。明万历八年（1580），大智禅师创海潮庵，发展为今法雨禅寺。万历中，僧圆慧创慧济庵，发展为今慧济禅寺。另据宋赵彦卫《云麓漫钞》记载，南宋时潮音洞一带建有“观音岩寺”。',
          '最早在山上建庵的是真歇禅师，南宋绍兴元年（1131）在今普济寺后麓建真歇庵。宋时今鹤鸣庵一带有僧野鹤结茅焚修。元至元十三年（1276） ，丞相伯颜命部帅哈剌歹谒潮音洞，见大士灵现，构殿于洞上。到元末，山上有殿宇300余间，毁于明洪武二十年（1387）海禁。天顺、正德年间，有僧上山建庵，至成化年间（1465-1487）逐渐复兴，又毁于嘉靖间（1522-1566）倭乱。隆庆六年（1572），明所等5僧在山上建盖殿房，定海（今镇海）把总陈典带兵到山，焚庵拘僧，告示“船埠不许装送进香人民及游方僧道渡海”。万历二年（1574），翁州（今舟山市）籍僧真表等登山搭盖茅房，仍遭禁阻。万历五年，内臣明凤筑朝阳庵于佛顶山一带，祝发焚修；僧圆献结庵西天门上。翌年，真表接任宝陀寺住持。万历十四年，慈圣李太后颁《藏经》到山，真表进京谢恩，邀请海内名衲到山结庵53处。万历二十四年五月，督军刘元霖再次勒石禁建庵宇，但屡禁不止，据定海把总赵九思《手本》反映，当时山上“祠宇殿堂，僧房静室，日则满山棋布，夜则燃火星罗，总计二百有奇”。万历二十七年二月，神宗再赐《藏经》。万历三十年， 遣内官张随等来山敕建寺院。万历三十三年再派内官大规模兴建寺院。自此，庵宇静室，遍布全山，至明末，有名可考的大寺有103庵。',
          ' 清康熙十年（1671）再次迁僧。康熙二十三年弛海禁，僧众归山，旧有庵院，渐次建复。康熙年间共190庵，至道光十二年（1832）废去16庵，存174庵，新建14庵，共188庵。',
          ' 道光188庵，至民国十三年（1924），废去或列为茅篷133庵，其中55庵“旧者新之，隘者扩之”，规制不断增大。此外，原属普济寺东、西寮的大悲殿、锡麟堂等，因住持退居，陆续扩建或自立门户13庵。加上清末民国初新建19庵，共88庵。民国十六年，又有龙沙、芦干2庵之建，共90庵。',
          '新中国成立初，部分庵院倒圮或被拆，据1952年定海县文书档案资料记载，当时全山存83庵。',
          '1962年5月，据1964年4月《普陀山房屋情况调査报告》，全山房屋149处，其中前山1寺45庵35篷；中山1寺22庵23篷；后山1寺7庵3篷，合计3大寺74庵61篷。同年10月，中山海曙庵遭火焚毁，旋建复平房5间。',
          '“文化大革命”期间，先后有妙峰、朝阳洞、下清凉等10庵被拆。至1978年底，全山只存3大寺64庵，除梅福庵仍有40余名僧尼居住外，其余寺庵均被机关、驻军和渔农民居住使用。',
          '1979年落实宗教政策。是年3月，海军让出普济寺；10月，陆军让出慧济寺；1980年10月起，驻军又陆续退出法雨寺、三圣堂、天福庵、广福庵、洪筏房、梵音洞庵、鹤鸣庵等。其中3大寺、大乘庵、龙寿庵、观音洞庵、梅福庵等归还佛协，其余仍由机关单位和企业占用。',
          '1980年起，佛协对已归还寺院进行逐个整修。1985年，中央办公厅、国务院办公厅（1985）59号文件规定，先划定普济寺、法雨寺、慧济寺、大乘庵、观音洞、梅福庵……等20处寺院的范围，归还普陀山佛教协会管理使用；其他几处需要归还的寺院，也应尽快列出名单，并与普陀山佛教协会协商，确定归还期限，逐一落实。',
          '1988年2月，浙江省人民政府办公厅（1988）21号文件规定：将积善堂、晏坐堂、龙寿庵、鹤鸣庵、伴山庵、报本堂、承恩堂、宝莲庵、茅草寮移交给佛协使用。佛协对归还寺庵进行修复、拆造或重建。同时，新建的有不肯去观音院、善财洞庵、南海观音大厅、宝陀讲寺、万佛宝塔、洛迦山大觉禅院、圆通禅院、大悲殿，中国佛学院普陀山学院（院内有普陀讲寺）等；收归的尚有多宝塔院，重建的有梵音古洞、慈云、紫竹林、西方、伴山、隐秀、香林、长生、古佛洞等庵。',
          '截至2016年底，普陀山已修复开放（包括新建）的有4大寺、43所庵院（包括2座茅篷），已收归佛协修复的庵院6处。'
        ]
      },
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
    selectBuilding(id) {
      console.log(id)
      // this.$router.push({name: 'imageinfos', params: {id: id}})
    }
  },
  created() {
    this.getBuilding()
  },
  components: {
    echarts,
    'horizontal-image-list': HorizontalImageList
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
