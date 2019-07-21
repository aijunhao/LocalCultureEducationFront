<template>
  <div>
    <el-upload
      :action="uploadUrl()"
      :file-list="imgList"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      list-type="picture-card"
      multiple
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="dialogImageUrl" alt width="100%" />
    </el-dialog>
  </div>
</template>

<script>
import config from '../config'

export default {
  props: ['type', 'imgList'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
    }
  },
  methods: {
    uploadUrl() {
      return config.EXECUTE_POST_UPLOAD_IMAGE + `?type=${this.type}`
    },
    /**
     * 文件列表移除文件时的钩子
     */
    handleRemove(file, imgList) {
      console.log(file.id, file.uid, imgList)
      this.deleteImage(file.id)
    },
    /**
     * 点击文件列表中已上传的文件时的钩子
     */
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    /**
     * 文件上传成功时的钩子
     */
    handleSuccess(req, file, imgList) {
      let image = {
        id: req.id,
        url: req.url,
        name: req.name,
        uid: file.uid,
        status: 'success'
      }
      this.imgList.push(image)
    },
    // 删除图片
    deleteImage(id) {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_DELETE_IMAGE + `/${id}`
      })
        .then(data => {
          if (data.status === 200)
            this.$notify({
              title: '成功',
              message: '图片删除成功',
              type: 'success'
            })
          else {
            this.$notify.error({
              title: '错误',
              message: '图片删除失败'
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

<style lang="stylus"></style>
