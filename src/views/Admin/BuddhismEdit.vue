<template>
  <div id="buddhism_edit">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>海天佛国</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 首页 -->
    <div class="buddhism-edit-box">
      <p class="title">海天佛国首页模块</p>
      <p class="tips">该部分主要包括普陀山的风景介绍和路由导航</p>
    </div>

    <!-- 首页 -->
    <div class="buddhism-edit-box">
      <p class="title">VR 逛普陀</p>
      <p class="tips">该部分采用第三方网站提供的普陀山全山寺庙和山水风光 VR 全景图</p>
      <p>版权所有：普陀山佛教协会</p>
      <p>开发者：心佛文化传播公司</p>
      <p>摄影师：杨赫</p>
      <p>平台：视维云</p>
      <p>作品详情：庆祝南海观音开光二十周年</p>
      <p style="color: red">说明：此部分仅用于普陀山佛学乡土文化教育学习拓展，我们只提供站外链接，如果侵权行为，请联系删除。</p>
      <el-input placeholder="i.svrvr.com/?a=wapview&id=s62806#" readonly>
        <template slot="prepend">https://</template>
      </el-input>
    </div>

    <!-- 寺庙庵堂 -->
    <div class="buddhism-edit-box">
      <p class="title">寺庙庵堂模块</p>
      <p class="tips">该部分主要包括普陀山的寺庙庵堂，及千余年寺庙庵堂的数量变化统计</p>

      <image-edit
        :anchor="'anchor-class'"
        :disabled="buildingDisabled"
        :imageList="buildingList"
        :status="buildingStatus"
        :type="6"
      ></image-edit>
    </div>
  </div>
</template>

<script>
import ImageEdit from '../../components/ImageEdit'
import ArticleEdit from '../../components/ArticleEdit'
import config from '../../config'

export default {
  components: {
    'article-edit': ArticleEdit,
    'image-edit': ImageEdit
  },
  data() {
    return {
      // 寺庙庵堂数据列表
      buildingList: [],
      buildingDisabled: [],
      buildingStatus: []
    }
  },
  created() {
    this.getBuilding()
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
          if (req.status === 200) {
            this.buildingList = req.data

            this.buildingDisabled = new Array(this.buildingList.length).fill(
              true
            )
            buildingStatus = new Array(this.buildingList.length).fill(0)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>


<style lang="stylus">
#buddhism_edit
  .buddhism-edit-box
    background #fff
    padding 50px
    margin-bottom 20px

  .title
    font-size 1.5rem
    font-weight 600
    margin 0

  .tips
    font-size 0.9rem
    color #909399
</style>