<template>
  <div id="museum">
    <!-- 博物馆 -->
    <div class="museum">
      <div>
        <p>博物馆</p>
        <p>普陀山佛教博物馆位于香华街36号原昙华庵址。博物馆为仿宋建筑，总建筑面积3643平方米，主体工程占地面积3400平方米，高度19. 68米，上下两层，分九厅。由原昙华庵拆建，与普陀山普济禅寺、多宝塔以及百子堂相毗邻，形成优势互补。现有馆藏佛教文物1200余件。</p>
      </div>
      <img alt src="http://120.79.254.54:3004/public/images/museum.jpg" />
    </div>

    <!-- 水平滚动图片 -->
    <horizontal-image-list
      :height="150"
      :imageList="exhibitList"
      :width="200"
      @select="selectExhibits"
    ></horizontal-image-list>

    <!-- 展品详情 -->
    <div class="museum-exhibit-info">
      <p>展品详情</p>
      <p>{{ exhibitList[index].title }}</p>
      <p>
        <span>作者：普陀山佛教协会</span>
        <span>来源：普陀山佛教网</span>
      </p>
      <img :src="exhibitList[index].url" />
      <p>{{ exhibitList[index].content }}</p>
    </div>

    <!-- 上一个下一个 -->
    <div class="museum-button">
      <span @click="pre">
        <i class="el-icon-arrow-left"></i>上一个
      </span>
      <span @click="next">
        下一个<i class="el-icon-arrow-right"></i>
      </span>
    </div>
  </div>
</template>

<script>
import HorizontalImageList from '../../components/HorizontalImageList'
import config from '../../config'

export default {
  components: {
    'horizontal-image-list': HorizontalImageList
  },
  data() {
    return {
      // 展品数据列表
      exhibitList: [
        {
          title: '',
          img: '',
          content: '数据丢失了，请稍后再试！'
        }
      ],
      // 选中展品项序号
      index: 0
    }
  },
  created() {
    this.getExhibits()
  },
  methods: {
    /**
     * 获取展品数据
     */
    getExhibits() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_EXHIBITS
      })
        .then(data => {
          console.log(data.data)
          if (data.data) this.exhibitList = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 展品选择
    selectExhibits(index) {
      console.log(index)
      this.index = index
    },
    // 上一个
    pre() {
      if (this.index > 0) this.index--

      console.log(this.index)
    },
    // 下一个
    next() {
      if (this.index < this.exhibitList.length - 1) this.index++

      console.log(this.index)
    }
  }
}
</script>

<style lang="stylus">
#museum
  .museum
    margin-bottom 20px
    background #d3dcd9

    div
      padding 20px

      p:nth-child(1)
        text-align center
        font-family '华文行楷'

      p:nth-child(2)
        text-indent 2rem

    img
      width 60%
      height 300px

  .museum-exhibit-info
    margin-top 20px
    text-align center

    p
      text-align left

      &:nth-child(1)
        font-weight 600
        font-family '华文行楷'

      &:nth-child(2)
        text-align center
        font-weight 600

      &:nth-child(3)
        display flex
        display -webkit-flex
        justify-content space-around

      &:last-child
        text-indent 2rem

  .museum-button
    display flex
    display -webkit-flex
    justify-content space-between
    user-select none

@media screen and (min-width: 960px)
  #museum
    padding 20px 15%

    .museum
      display flex
      display -webkit-flex
      justify-content space-between
      margin-bottom 20px

      div
        width 40%

        p:nth-child(1)
          font-size 2rem
          margin 20px

      img
        width 60%
        height 300px

    .museum-exhibit-info
      margin-top 20px
      text-align center

      p
        text-align left

        &:nth-child(1)
          font-size 1.2rem

        &:nth-child(2)
          font-size 1.5rem

@media screen and (max-width: 960px)
  $space = 10px

  #museum
    padding $space
    font-size 0.8rem

    .museum
      margin-bottom $space

      div
        padding $space

        p:nth-child(1)
          font-size 1.5rem
          margin 0

      img
        width 100%
        height (@width * 0.8)

    .museum-exhibit-info
      margin-top $space
      text-align center

      img   
        width 100%
      p
        text-align left

        &:nth-child(1)
          font-size 1.2rem

        &:nth-child(2)
          font-size 1.5rem
</style>
