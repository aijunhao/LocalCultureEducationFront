 <template>
  <div id="module_edit">
    <!-- 上传 -->
    <div>
      <el-upload
        :action="uploadUrl()"
        :on-success="handleModuleSuccess"
        :show-file-list="false"
        class="avatar-uploader"
        list-type="picture-card"
      >
        <img :src="module.url" class="avatar" v-if="module.url" />
        <i class="el-icon-plus avatar-uploader-icon" v-else></i>
      </el-upload>
      <p class="tips">导航模块仅支持显示一张图片，点击图片即可重新上传</p>
    </div>

    <!-- 内容 -->
    <div class="home-content-message">
      <el-form label-width="80px">
        <el-form-item label="模块名称">
          <el-input :readonly="readonly" v-model="module.moduleName"></el-input>
        </el-form-item>
        <el-form-item label="模块标题">
          <el-input :readonly="readonly" v-model="module.title"></el-input>
        </el-form-item>
        <el-form-item label="模块内容">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            :readonly="readonly"
            placeholder="请输入内容"
            type="textarea"
            v-model="module.content"
          ></el-input>
        </el-form-item>
        <el-form-item label="跳转页面">
          <el-input placeholder="此功能暂未开启。" readonly></el-input>
        </el-form-item>
      </el-form>
    </div>

    <!-- 按钮 -->
    <div class="home-content-setting">
      <!-- 状态 -->
      <p class="tips" v-text="status"></p>
      <!-- 按钮 -->
      <el-button @click="edit()" circle icon="el-icon-edit" type="success"></el-button>
      <el-button @click="lock()" circle icon="el-icon-lock" type="warning"></el-button>
      <el-button @click="update()" circle icon="el-icon-upload" type="primary"></el-button>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  data() {
    return {
      // 是否只读
      readonly: true,
      // 状态， 0 锁定， 1编辑， 2更新中
      status: '已锁定...'
    }
  },
  props: ['module'],
  methods: {
    uploadUrl() {
      return config.EXECUTE_POST_UPLOAD_IMAGE
    },
    /**
     * 锁定
     */
    lock(index) {
      this.readonly = true
      this.status = '已锁定...'

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
    update(index) {
      this.readonly = true
      this.status = '提交中...'

      var urlArr = this.module.url.split('/')

      this.$axios({
        method: 'post',
        url: config.EXECUTE_POST_UPDATE_IMAGE_MESSAGE,
        data: {
          id: this.module.id,
          url: urlArr[urlArr.length - 1],
          title: this.module.title,
          content: this.module.content,
          moduleName: this.module.moduleName
        }
      })
        .then(data => {
          if (data.status === 200) {
            this.status = '已锁定...'
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
     * 编辑
     */
    edit() {
      this.readonly = false
      this.status = '编辑中...'

      this.$notify({
        title: '编辑模式',
        message: '编辑模式已开启，当前可以进行模块部分图片上传及文本编辑！',
        type: 'success'
      })
    },
    /**
     * 文件上传成功时的钩子
     */
    handleModuleSuccess(req, file, imgList) {
      //  重置对象
      this.module.url = req
      console.log(this.module)
      this.edit()
    }
  }
}
</script>

<style lang="stylus">
#module_edit
  display flex
  display -webkit-flex
  justify-content flex-start
  border-bottom 1px solid black
  padding 30px 0

  .home-content-message
    margin 0 50px
    width 100%

  .home-content-setting
    button
      margin 5px

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
    width 180px
    height 180px
    line-height 180px
    text-align center

  .avatar
    width 180px
    height 180px
    display block
</style>
