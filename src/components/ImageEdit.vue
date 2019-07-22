<template>
  <div id="image_edit">
    <div :key="i" class="image-edit-box" v-for="(exhibitList, i) in exhibitList" :class="anchor">
      <div>
        <p class="list-number">列表顺序：{{ i + 1 }}</p>

        <el-upload
          :action="uploadUrl()"
          :on-success="(response, file, fileList) => handleImageSuccess(response, file, fileList, i)"
          :show-file-list="false"
          class="avatar-uploader"
          list-type="picture-card"
        >
          <img :src="exhibitList.url" class="avatar" v-if="exhibitList.url" />
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>

        <p class="tips">该模块只支持显示一张图片，点击图片即可重新上传</p>
      </div>

      <!-- 内容 -->
      <div class="image-edit-message">
        <el-form label-width="80px">
          <el-form-item label="标题">
            <el-input :readonly="readonly" v-model="exhibitList.title"></el-input>
          </el-form-item>
          <el-form-item label="发布者">
            <el-input :readonly="readonly" placeholder v-model="exhibitList.author"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-input :readonly="readonly" placeholder v-model="exhibitList.time"></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input :readonly="readonly" placeholder v-model="exhibitList.sourse"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              :readonly="readonly"
              placeholder="请输入内容"
              type="textarea"
              v-model="exhibitList.content"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <el-button circle icon="el-icon-delete" type="danger"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  props: ['exhibitList', 'type', 'anchor'],
  data() {
    return {
      readonly: true
    }
  },
  methods: {
    uploadUrl() {
      return config.EXECUTE_POST_UPLOAD_IMAGE
    },
    handleImageSuccess(req, file, imgList, index) {
      if (req.status === 200) {
        this.exhibitList[index].url = req.url
        // console.log(this.exhibitList[index].url, req.url)
        this.$notify({
          title: '图片上传',
          message: '图片上传成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="stylus">
#image_edit
  .el-form-item
    margin-bottom 10px !important

  .image-edit-box
    display flex
    display -webkit-flex
    justify-content space-between
    border-bottom 1px solid black
    padding 30px 0

    .list-number
      margin-top 0
      font-weight 600
      padding-left 5px

  .image-edit-message
    margin 0 50px
    width 100%

  .avatar-uploader .el-upload
    width 178px
    height 178px
    border 1px dashed #d9d9d9
    border-radius 6px
    cursor pointer
    position relative
    overflow hidden

  .avatar-uploader .el-upload:hover
    border-color #409EFF

  .avatar-uploader-icon
    font-size 28px
    color #8c939d
    width 178px
    height 178px
    line-height 178px
    text-align center

  .avatar
    width 178px
    height 178px
    display block
</style>
