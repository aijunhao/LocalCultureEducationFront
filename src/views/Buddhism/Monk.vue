<template>
  <div id="monk">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/buddhism/HistoryHome'}">普陀编年史</el-breadcrumb-item>
      <el-breadcrumb-item>普陀佛史</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="monk-box">
      <!-- 移动端顶部选择器 -->
      <div class="monk-link-select">
        <span>选择：</span>
        <el-select @change="selectPeriod(periodValue)" placeholder="请选择" v-model="periodValue">
          <el-option :key="i" :label="item" :value="item" v-for="(item, i) in period"></el-option>
        </el-select>
      </div>

      <!-- PC 端左侧选择器 -->
      <div class="monk-link-list">
        <ul>
          <li
            :class="periodValue === period[i] ? 'select' : ''"
            :key="i"
            @click="selectPeriod(item)"
            v-for="(item, i) in period"
            v-text="item"
          ></li>
        </ul>
      </div>

      <div class="monk-box-content">
        <ul class="monk-box-content-list">
          <li>
            <div class="title">
              <p class="name">姓名</p>
              <p class="period">朝代</p>
              <p class="time">发布时间</p>
            </div>
          </li>
          <li :key="i" class="dropdown" v-for="(item, i) in monkList">
            <div class="item">
              <p class="name" v-text="item.title"></p>
              <p class="period" v-text="item.subtitle"></p>
              <p class="time">{{ item.time | dataFormat }}</p>
            </div>
            <div class="info">
              <p>
                <span>发布者：{{ item.author }}</span>
                <span>来源：{{ item.source }}</span>
              </p>
              <p v-text="item.content"></p>
            </div>
          </li>
          <p class="tips" v-if="this.monkList.length === 0">暂无数据</p>
        </ul>

        <el-pagination
          :current-page.sync="currentPage"
          :page-size="pageSize"
          :total="total"
          @current-change="pageChange"
          background
          layout="prev, pager, next, total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../../config'

export default {
  data() {
    return {
      // 僧侣信息
      monkList: [],
      // 每页数量
      pageSize: 10,
      // 总数量,
      total: 0,
      // 当前页
      currentPage: 1,
      // 年代列表
      period: [
        '全部',
        '南宋',
        '元代',
        '明代',
        '晚清及民国',
        '游山僧侣',
        '当代',
        '不详'
      ],
      // 选中的年代值
      periodValue: '全部'
    }
  },
  created() {
    this.getMonk()
  },
  methods: {
    /**
     * 获取僧侣数据
     */
    getMonk() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_BUDDHISM_MONK,
        params: {
          period: this.periodValue,
          page: this.currentPage,
          pageSize: this.pageSize
        }
      })
        .then(req => {
          if (req.status === 200) {
            // console.log(req)
            this.monkList = req.data.data
            this.total = req.data.total
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 换页
     */
    pageChange(currentPage) {
      console.log(currentPage)
      this.getMonk()
    },
    /**
     * 选择朝代
     */
    selectPeriod(value) {
      this.periodValue = value
      this.getMonk()
    }
  }
}
</script>

<style lang="stylus">
#monk
  .el-pagination
    text-align center
    margin-top 20px

  ul
    padding 0
    margin 0
    list-style none

  .monk-link-select
    display flex
    display -webkit-flex
    align-items center
    padding-left 20px
    justify-content space-between
    margin-bottom 20px

  .monk-box-content
    display flex
    justify-content space-between
    flex-direction column

    .monk-box-content-list
      .title, .item
        display -webkit-flex
        display flex
        justify-content space-between
        padding 0 20px

      .title
        text-align left

      .title
        font-weight 600
        border-top 2px solid #DCDFE6
        border-bottom 2px solid #DCDFE6

      .name
        text-align left
        width 20%

      .period
        width 20%
        text-align right

      .time
        width 45%
        text-align right

      .info
        max-height 0
        transition max-height 1s ease
        -webkit-transition max-height 1s ease
        overflow hidden
        padding 0 20px

        p:first-child
          display flex
          display -webkit-flex
          justify-content space-around

        p:last-child
          text-indent 2rem

      .dropdown
        border-bottom 2px dashed #DCDFE6

        &:hover .item
          color #409EFF
          background #fff
          cursor pointer

        &:hover .info
          max-height 1000px

      .tips
        font-size 0.9rem
        color #909399
        text-align center

@media screen and (min-width: 960px)
  #monk
    padding 20px 15%

    .monk-box
      display -webkit-flex
      display flex
      justify-content space-between
      min-height 600px

      .monk-link-select
        display none

      .monk-link-list
        width 200px

        li
          text-align center
          padding 10px 0
          font-size 1.2rem

        li:hover, .select
          color #409EFF
          background #fff

      .monk-box-content
        width calc(100% - 250px)

@media screen and (max-width: 960px)
  #monk
    padding 10px

    .monk-link-list
      display none
</style>
