<template>
  <div id="guanyin" ref="guanyin">
    <!-- 轮播图 -->
    <carousel :imgList="imgList"></carousel>

    <!-- 总体构想 -->
    <div class="guanyin-main">
      <ul>
        <li :key="i" v-for="(item, i) in others">
          <img :src="item.img" alt />
        </li>
      </ul>
      <div>
        <p>观音法界总体构想</p>
        <p>
          法界为佛教术语，法泛指宇宙万有一切事物，包括世出世间法，即一切不同的万事万物都能保持各自的特性，并按自身的轨则。界，即为分门别类的不同事物各守其不同的界限。观音法界就是关于观音菩萨和观音文化的集合。
          观音法界的总体构想是要打造以观音文化为主题，集朝圣、观光、体验、教化功能于一体，集观音菩萨和观音文化之大成的观音博览园。“观音法界”相应的功能定位为：呈现观音信仰的平台，培养佛教人才的摇篮，度化四众弟子的心灵家园。既要打造佛教建筑的传世之作，又要成为普陀山观音文化的博览园、弘法中心。观音法界要以中国汉传佛教传承千载的观音信仰为内核，以观音圣地普陀山僧团为主体，在硬件形态上凸显能够代表当代佛教建筑最高典范的“建筑地标”，在软件功能上成就现代佛教弘化理念的“精神地标”，包括通过观音的文字搜集、观音在民间流传的故事编纂、不同时代各种形态观音宝像的征集、观音语录和观音经书的整理出版等等，确保艺术品位、人文价值与纯正信仰的高度统一，打造成当代佛教建筑的传世之作和观音信众的心灵家园，呈现一派人间佛教景象。
        </p>
      </div>
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
          this.imgList = data.data.carousel
          this.others = data.data.others
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
  .guanyin-main
    display flex
    display -webkit-flex
    justify-content space-between
    margin-top 50px

    ul
      list-style none
      padding 0
      margin 0
      display flex
      display -webkit-flex
      justify-content flex-start
      align-content flex-start
      flex-wrap wrap
      width 45%

      li
        margin 5px
        width calc((100% / 2) - 10px)
        height calc(@width * 0.8)

        img
          width 100%
          height 100%

    div
      width 50%

      p:nth-child(1)
        font-size 1.2rem
        font-weight 600
        font-family '华文行楷'

      p:nth-child(2)
        font-size 0.9rem
        -webkit-line-clamp 13
        display -webkit-box
        overflow hidden
        -webkit-box-orient vertical
</style>
