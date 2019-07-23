<template>
  <div>
    <el-upload
      :action="uploadUrl()"
      :file-list="imageList"
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
  props: ['type', 'imageList'],
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
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
      // 更新数据库
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_DELETE_IMAGE + `/${file.id}`
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
      if (req.status === 200) {
        let image = {
          id: req.data.id,
          url: req.data.url,
          name: req.data.name,
          uid: file.uid,
          status: 'success'
        }
        this.imageList.push(image)
        this.$notify({
          title: '成功',
          message: '图片上传成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style lang="stylus"></style>
