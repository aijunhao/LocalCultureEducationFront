<template>
  <div id="home">
    <!-- 走马灯背景图 -->
    <el-carousel :height="carouselHeight" :interval="5000" arrow="always">
      <el-carousel-item :key="url" v-for="(url, i) in carouselImgs">
        <el-image :src="url" @click="show(i)" fit="fill"></el-image>
      </el-carousel-item>
    </el-carousel>

    <!-- 地理位置 -->
    <div class="home-content">
      <p class="home-content-title">{{ locationMessage.title }}</p>
      <div class="home-content-message">
        <div class="home-content-message-img">
          <el-image :src="locationMessage.img" fit="fill"></el-image>
        </div>
        <div class="home-content-message-main">
          <p>{{ locationMessage.subtitle }}</p>
          <p>{{ locationMessage.message }}</p>
          <el-button @click="$router.push('/location')" type="danger">更多</el-button>
        </div>
      </div>
    </div>

    <!-- 人文社会 -->
    <div class="home-content">
      <p class="home-content-title">{{ societyMessage.title }}</p>
      <div class="home-content-message">
        <div class="home-content-message-img">
          <el-image :src="societyMessage.img" fit="fill"></el-image>
        </div>
        <div class="home-content-message-main">
          <p>{{ societyMessage.subtitle }}</p>
          <p>{{ societyMessage.message }}</p>
          <el-button @click="$router.push('/society')" type="danger">更多</el-button>
        </div>
      </div>
    </div>

    <!-- 自然风景 -->
    <div class="home-content">
      <p class="home-content-title">自然风景</p>
      <ul id="home_nature_image_list">
        <li :key="i" v-for="(item, i) in natureImgs">
          <el-popover placement="top" trigger="hover" width="600">
            <!-- 弹出框大图 -->
            <el-image :src="item" fit="fill"></el-image>
            <!-- 缩略图 -->
            <el-image :src="item" fit="fill" slot="reference"></el-image>
          </el-popover>
        </li>
        <li @click="$router.push('/nature')">
          <img src="../assets/next.png" />
        </li>
      </ul>
    </div>

    <!-- 历史背景 -->
    <div class="home-content">
      <p class="home-content-title">{{ historyMessage.title }}</p>
      <div class="home-content-message">
        <div class="home-content-message-img">
          <el-image :src="historyMessage.img" fit="fill"></el-image>
        </div>
        <div class="home-content-message-main">
          <p>{{ historyMessage.subtitle }}</p>
          <p>{{ historyMessage.message }}</p>
          <el-button @click="$router.push('/society')" type="danger">更多</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图大小
      carouselHeight: '600px',
      // 轮播图图片数据
      carouselImgs: [
        'http://120.79.254.54:3004/public/images/home/homeCarousel/1.jpg',
        'http://120.79.254.54:3004/public/images/home/homeCarousel/2.jpg',
        'http://120.79.254.54:3004/public/images/home/homeCarousel/3.jpg',
        'http://120.79.254.54:3004/public/images/home/homeCarousel/4.jpg'
      ],
      // 自然风景图片数据
      natureImgs: [
        'http://120.79.254.54:3004/public/images/natureImages/1.jpg',
        'http://120.79.254.54:3004/public/images/natureImages/2.jpg',
        'http://120.79.254.54:3004/public/images/natureImages/3.jpg',
        'http://120.79.254.54:3004/public/images/natureImages/4.jpg',
        'http://120.79.254.54:3004/public/images/natureImages/5.jpg',
        'http://120.79.254.54:3004/public/images/natureImages/6.jpg',
        'http://120.79.254.54:3004/public/images/natureImages/7.jpg'
      ],
      locationMessage: {
        title: '地理环境',
        subtitle: '普陀山',
        message:
          '普陀山风景名胜区位于杭州湾南缘、舟山群岛东部海域，处北纬29°58′3～30°02′3，东经122°21′6～122°24′9。西南距沈家门渔港6.5公里，南距朱家尖岛2.5公里，东濒瀚海。行政区由普陀山、洛迦山、南山、小山洞、豁沙山、小洛迦山等小岛组成，隶舟山市普陀区。普陀山风景名胜区菱形，南北长8.6公里，东西宽约3.5公里，面积12.5平方公里，岸线长30公里。中部佛顶山最高，海拔288.2米，向四面延伸，西为茶山，北为伏龙山，东为青鼓垒山，东南为锦屏山、莲台山、白华山，西南为梅岑山，主峰均在100至200米间，连绵起伏，如遨游东海之蛟龙，昂首欲腾。洛迦山西距普陀山5.3公里，呈锐长三角形，南北长约1.05公里，东西宽0.6公里，面积0.36平方公里。岸线长3公里，海拔97.1米。从普陀山远望如一尊海上卧佛。',
        img: 'http://120.79.254.54:3004/public/images/home/location.jpg'
      },
      historyMessage: {
        title: '历史背景',
        subtitle: '',
        message:
          '普陀山原名梅岑山，因西汉末年梅福在此修道而得名。唐咸通四年（863年），日本高僧慧锷从五台山请得观音神像回国，途经莲花洋遇风涛，以为观音不肯去日本，便留下神像，称不肯去观音。五代梁朝贞明二年（916年）建不肯去观音院。宋元丰三年（1080年）朝廷赐银，改建为宝陀观音寺，从此香火兴盛。南宋嘉定七年（1214年），钦定为观音道场，并根据佛经补怛洛迦，更山名为普陀洛迦山，亦称补陀洛迦山。明朝时，把莲花洋南的一小岛称洛迦山，就有了普陀山和洛迦山两个山名。',
        img: 'http://120.79.254.54:3004/public/images/home/history.jpg'
      },
      societyMessage: {
        title: '人文社会',
        subtitle: '有山有水有佛有渔',
        message:
          '内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容',
        img: 'http://120.79.254.54:3001/public/images/1.jpg'
      }
    }
  },
  methods: {
    /**
     * 图片点击事件
     */
    show(index) {
      console.log(index)
    },
    /**
     * 轮播图重载
     */
    homeCarouselLoad() {
      this.$nextTick(() => {
        this.carouselHeight = window.innerWidth * 0.5 + 'px'
      })
    }
  },
  mounted() {
    // 当页面渲染完成时，重载轮播图大小
    this.homeCarouselLoad()
    window.onresize = () => {
      this.homeCarouselLoad()
    }
  }
}
</script>

<style lang="stylus">
#home
  .el-image
    height 100%
    width 100%

  .home-content
    .home-content-message-img
      min-height 100px
      background #fff

    .home-content-title
      text-align center
      font-size 2.5rem
      margin 30px 0

    .home-content-message
      p:nth-child(1)
        font-size 2rem
        margin 0

      p:nth-child(2)
        font-size 1rem

#home_nature_image_list
  list-style none

  li
    text-align center
    padding 0

  li:last-child:hover
    background #e6e6e6

  li:last-child img
    width 100px
    height 90px
    margin-top 30px

@media screen and (max-width: 960px)
  #home
    .home-content
      padding 10px

      .home-content-message-img
        width 100%
        margin-bottom 10px

  #home_nature_image_list li
    margin-bottom 10px
    min-height 50px
    background-color #fff

@media screen and (min-width: 960px)
  #home
    .home-content
      padding 10px 15%

      .home-content-message
        display flex
        display -webkit-flex

        .home-content-message-img
          width 25%
          min-width 300px

        .home-content-message-main
          margin-left 5%
          width 95%

  #home_nature_image_list
    display flex
    display -webkit-flex
    justify-content flex-start
    flex-wrap wrap

    li
      width 25%
      height 150px
</style>

