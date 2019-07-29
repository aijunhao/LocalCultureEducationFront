<template>
  <div id="image_edit">
    <!-- 列表 -->
    <div
      :class="anchor"
      :id="idName + '_' + i"
      :key="i"
      class="image-edit-box"
      v-for="(image, i) in imageList"
    >
      <div>
        <p class="list-number">列表顺序：{{ i + 1 }}</p>

        <el-upload
          :action="uploadUrl()"
          :on-success="(response, file, fileList) => handleImageSuccess(response, file, fileList, i)"
          :show-file-list="false"
          class="avatar-uploader"
          list-type="picture-card"
        >
          <img :src="image.url" class="avatar" v-if="image.url" />
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>

        <p class="tips">该模块只支持显示一张图片，点击图片即可重新上传</p>
      </div>

      <!-- 内容 -->
      <div class="image-edit-message">
        <el-form label-width="80px">
          <el-form-item label="标题">
            <el-input :disabled="disabled[i]" v-model="image.title"></el-input>
          </el-form-item>
          <el-form-item label="发布者">
            <el-input :disabled="disabled[i]" placeholder v-model="image.author"></el-input>
          </el-form-item>
          <el-form-item label="时间">
            <el-input disabled v-model="image.time"></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input :disabled="disabled[i]" placeholder v-model="image.source"></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              :disabled="disabled[i]"
              placeholder="请输入内容"
              type="textarea"
              v-model="image.content"
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
        <el-button @click="updateImage(image, i)" circle icon="el-icon-upload" type="primary"></el-button>
        <el-button @click="deleteImage(i)" circle icon="el-icon-delete" type="danger"></el-button>
      </div>
    </div>

    <!-- 创建 -->
    <div class="image-edit-new">
      <p class="tips">添加</p>
      <el-button @click="newImage()" circle icon="el-icon-plus" type="success"></el-button>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  props: {
    // 数据列表
    imageList: {
      type: Array
    },
    // 数据库存储表桥
    type: {
      type: Number
    },
    // 锚点定位类
    anchor: {
      type: String
    },
    // 数据不可编辑
    disabled: {
      type: Array
    },
    // 数据状态
    status: {
      type: Array
    },
    // id
    idName: {
      type: String
    }
  },
  methods: {
    uploadUrl() {
      return config.EXECUTE_POST_UPLOAD_IMAGE
    },
    /**
     * 图片上传成功钩子
     */
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
    /**
     * 状态显示
     */
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
    updateImage(image, index) {
      this.$set(this.disabled, index, true)
      this.$set(this.status, index, 2)

      console.log(image)
      var urlArr = image.url.split('/')

      this.$axios({
        method: 'post',
        url: config.EXECUTE_POST_UPDATE_IMAGE_MESSAGE,
        data: {
          id: image.id,
          url: urlArr[urlArr.length - 1],
          title: image.title,
          content: image.content,
          sourse: image.sourse
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
    },
    /**
     * 删除
     */
    deleteImage(index) {
      console.log(this.imageList[index].id)
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return this.$axios({
            method: 'get',
            url:
              config.EXECUTE_GET_DELETE_IMAGE + `/${this.imageList[index].id}`
          })
        })
        .then(req => {
          if (req.status === 200) {
            // console.log(req)
            this.imageList.splice(index, 1)
            this.$notify({
              title: '刪除',
              message: '图片已删除成功',
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '刪除',
            message: '图片删除失败，已取消删除操作',
            type: 'success'
          })
        })
    },
    /**
     * 创建
     */
    newImage() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_NEW_IMAGE + `/${this.type}`
      })
        .then(req => {
          if (req.status === 200) {
            this.imageList.push(req.data[0])

            this.disabled.push(true)
            this.status.push(0)
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
  .image-edit-new
    display flex
    display -webkit-flex
    justify-content flex-end
    margin 20px 10px
    align-items center

    button
      margin-left 10px

  .image-edit-box
    display flex
    display -webkit-flex
    justify-content space-between
    border-bottom 1px solid black
    padding 30px 0

    .el-form-item
      margin-bottom 10px !important

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

    .module-edit-button
      button
        margin 10px
        display block

    .list-number
      margin-top 0
      font-weight 600
      padding-left 5px

    .image-edit-message
      margin 0 50px
      width 100%
</style>
