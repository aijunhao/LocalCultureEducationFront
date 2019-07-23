<template>
  <div id="image_edit">
    <div :class="anchor" :key="i" class="image-edit-box" v-for="(exhibit, i) in imageList">
      <div>
        <p class="list-number">列表顺序：{{ i + 1 }}</p>

        <el-upload
          :action="uploadUrl()"
          :on-success="(response, file, fileList) => handleImageSuccess(response, file, fileList, i)"
          :show-file-list="false"
          class="avatar-uploader"
          list-type="picture-card"
        >
          <img :src="exhibit.url" class="avatar" v-if="exhibit.url" />
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>

        <p class="tips">该模块只支持显示一张图片，点击图片即可重新上传</p>
      </div>

      <!-- 内容 -->
      <div class="image-edit-message">
        <el-form label-width="80px">
          <el-form-item label="标题">
            <el-input :disabled="disabled[i]" v-model="exhibit.title"></el-input>
          </el-form-item>
          <el-form-item label="发布者">
            <el-input :disabled="disabled[i]" placeholder v-model="exhibit.author"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-input disabled v-model="exhibit.time"></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input :disabled="disabled[i]" placeholder v-model="exhibit.sourse"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              :disabled="disabled[i]"
              placeholder="请输入内容"
              type="textarea"
              v-model="exhibit.content"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 按钮 -->
      <div class="module-edit-button">
        <!-- 状态 -->
        <p class="tips" v-text="statusShow(i)"></p>
        <!-- 按钮 -->
        <el-button @click="editImage(i)" circle icon="el-icon-edit" type="success"></el-button>
        <el-button @click="lockImage(i)" circle icon="el-icon-lock" type="warning"></el-button>
        <el-button @click="updateImage(exhibit, i)" circle icon="el-icon-upload" type="primary"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  props: ['imageList', 'type', 'anchor', 'disabled', 'status'],
  methods: {
    uploadUrl() {
      return config.EXECUTE_POST_UPLOAD_IMAGE
    },
    handleImageSuccess(req, file, imgList, index) {
      if (req.status === 200) {

        this.editImage(index)
        this.imageList[index].url = req.url
        
        this.$notify({
          title: '图片上传',
          message: '图片上传成功',
          type: 'success'
        })
      }
    },
    statusShow(index) {
      switch (this.status[index]) {
        case 0:
          return '已锁定...'
          break
        case 1:
          return '编辑中...'
          break
        case 2:
          return '提交中...'
          break
        default:
          return '已锁定...'
          break
      }
    },
    /**
     * 编辑
     */
    editImage(index) {
      this.$set(this.disabled, index, false)
      this.$set(this.status, index, 1)

      this.$notify({
        title: '编辑模式',
        message: '编辑模式已开启，当前可以进行模块部分图片上传及文本编辑！',
        type: 'success'
      })
    },
    /**
     * 锁定
     */
    lockImage(index) {
      this.$set(this.disabled, index, true)
      this.$set(this.status, index, 0)

      this.$notify({
        title: '锁定模式',
        message:
          '编辑模式已开启，当前文本不可编辑！点击编辑，可解锁为编辑模式。',
        type: 'success'
      })
    },
    /**
     * 提交
     */
    updateImage(exhibit, index) {
      this.$set(this.disabled, index, true)
      this.$set(this.status, index, 2)

      console.log(exhibit)
      var urlArr = exhibit.url.split('/')

      this.$axios({
        method: 'post',
        url: config.EXECUTE_POST_UPDATE_IMAGE_MESSAGE,
        data: {
          id: exhibit.id,
          url: urlArr[urlArr.length - 1],
          title: exhibit.title,
          content: exhibit.content,
          sourse: exhibit.sourse,
        }
      })
        .then(data => {
          if (data.status === 200) {
            this.$set(this.status, index, 0)
            this.$notify({
              title: '成功',
              message: '模块信息更新成功，模块已锁定。',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '模块信息更新失败，请稍后再试'
            })
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
#image_edit
  .module-edit-button
    button
      margin 10px
      display block

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
