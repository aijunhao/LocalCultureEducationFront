<template>
  <div id="guanyin" ref="guanyin">
    <!-- logo -->
    <img alt class="guanyin-logo" src="../../assets/观音法界.png" />

    <!-- 轮播图 -->
    <carousel :imgList="imgList" :showIndicator="'none'"></carousel>

    <!-- 整体规划 -->
    <div>
      <p class="title">观音法界项目整体规划</p>
      <p
        class="content"
      >观音文化园规划区域位于舟山市普陀区朱家尖白山景区一带，总面积约9平方公里，可建设用地3.8平方公里，项目整体规划定位为大型佛教文化主题园区，其中工程分为两块同步进行，一块为核心区域观音法界，一块为观音法界周边业态配套。</p>
      <p
        class="content"
      >观音法界规划面积约2500亩，总建筑体量约28万平方米，由普陀山佛教协会出资建设并管理。它的周边配套项目规划面积约3000亩左右，由政府负责制订总体规划并配套与观音文化有关的素食、佛教用品、佛教主题社区和主题酒店等相关旅游服务产业，同时开展招商引资工作。观音法界的总体布局考虑到朱家尖的地形地貌，目前基本的构想是点线结合，以香莲路为轴线依次展开，从东至西分别布局入普隐精舍、中国佛学院普陀山学院男众部及扩建工程、观音圣坛、居士学院、正法讲寺暨中国佛学院普陀山学院女众部等5个佛教单体项目，整个观音法界计划于2019年6月底全面竣工。</p>
    </div>

    <!-- 总体构想 -->
    <div class="guanyin-main">
      <div>
        <p class="title">观音法界总体构想</p>
        <p class="content">
          法界为佛教术语，法泛指宇宙万有一切事物，包括世出世间法，即一切不同的万事万物都能保持各自的特性，并按自身的轨则。界，即为分门别类的不同事物各守其不同的界限。观音法界就是关于观音菩萨和观音文化的集合。
          观音法界的总体构想是要打造以观音文化为主题，集朝圣、观光、体验、教化功能于一体，集观音菩萨和观音文化之大成的观音博览园。“观音法界”相应的功能定位为：呈现观音信仰的平台，培养佛教人才的摇篮，度化四众弟子的心灵家园。既要打造佛教建筑的传世之作，又要成为普陀山观音文化的博览园、弘法中心。观音法界要以中国汉传佛教传承千载的观音信仰为内核，以观音圣地普陀山僧团为主体，在硬件形态上凸显能够代表当代佛教建筑最高典范的“建筑地标”，在软件功能上成就现代佛教弘化理念的“精神地标”，包括通过观音的文字搜集、观音在民间流传的故事编纂、不同时代各种形态观音宝像的征集、观音语录和观音经书的整理出版等等，确保艺术品位、人文价值与纯正信仰的高度统一，打造成当代佛教建筑的传世之作和观音信众的心灵家园，呈现一派人间佛教景象。
        </p>
      </div>
    </div>

    <!-- 分隔线 -->
    <el-divider>单体项目</el-divider>

    <!-- 单体项目 -->
    <div :key="i" class="guanyin-item" v-for="(item, i) in others">
      <div>
        <p class="title">{{ item.title }}</p>
        <p class="content">{{ item.content }}</p>
      </div>
      <img :src="item.url" alt />
    </div>
  </div>

  <!-- 整体规划 -->
</template>

<script>
import config from '../../config'
import carousel from '../../components/Carousel'

export default {
  components: {
    carousel
  },
  data() {
    return {
      imgList: '',
      others: ''
    }
  },
  methods: {
    /**
     * 获取轮播图数据
     */
    getCarousel() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_BUDDHISM_INIT
      })
        .then(data => {
          console.log(data.data)
          if (data.data) {
            this.imgList = data.data.carousel
            this.others = data.data.others
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getCarousel()
  }
}
</script>

<style lang="stylus">
#guanyin
  .el-divider__text
    background #f2f2f2
    font-family '华文行楷'
    font-size 1.2rem

  .title
    font-family '华文行楷'

  .content
    text-indent 2rem

  .guanyin-main
    background url('http://120.79.254.54:3004/public/images/观音法界.jpg')
    background-repeat no-repeat
    background-size cover

    div
      background rgba(255, 255, 255, 0.6)

@media screen and (min-width: 960px)
  #guanyin
    padding 20px 15%

    .title
      font-size 1.5rem

    .content
      font-size 1rem

    .guanyin-main
      margin 50px 0
      padding 20px

      div
        width 50%
        border-radius 10px
        padding 20px

        p:nth-child(2)
          font-size 0.9rem
          -webkit-line-clamp 13
          display -webkit-box
          overflow hidden
          -webkit-box-orient vertical

    .guanyin-item
      display flex
      display -webkit-flex
      justify-content space-between
      margin 20px 0

      &:nth-child(even)
        flex-direction row-reverse

      div
        width 50%
        padding 20px

      img
        width 45%

@media screen and (max-width: 960px)
  #guanyin
    padding 10px

    .title
      font-size 1.2rem

    .content
      font-size 0.8rem

    .guanyin-logo
      height 50px

    .guanyin-main
      margin 10px 0

      div
        padding 10px

    .guanyin-item
      margin 10px 0

      img
        width 100%
</style>
