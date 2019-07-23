 <template>
  <div id="module_edit">
    <div :class="anchor" :key="i" class="module-box" v-for="(module, i) in moduleList">
      <!-- 上传 -->
      <div>
        <el-upload
          :action="uploadUrl()"
          :on-success="(response, file, fileList) => handleModuleSuccess(response, file, fileList, i)"
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
      <div class="module-edit-message">
        <el-form label-width="80px">
          <el-form-item label="模块名称" v-show="showModuleName">
            <el-input disabled v-model="module.moduleName"></el-input>
          </el-form-item>
          <el-form-item label="模块标题">
            <el-input :disabled="disabled[i]" v-model="module.title"></el-input>
          </el-form-item>
          <el-form-item label="模块内容">
            <el-input
              :autosize="{ minRows: 2, maxRows: inputMaxRows}"
              :disabled="disabled[i]"
              placeholder="请输入内容"
              type="textarea"
              v-model="module.content"
            ></el-input>
          </el-form-item>
          <el-form-item label="跳转页面" v-show="showJumpModule">
            <el-input disabled placeholder="此功能暂未开启。"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <!-- 按钮 -->
      <div class="module-edit-button">
        <!-- 状态 -->
        <p class="tips" v-text="statusShow(i)"></p>
        <!-- 按钮 -->
        <el-button @click="editModule(i)" circle icon="el-icon-edit" type="success"></el-button>
        <el-button @click="lockModule(i)" circle icon="el-icon-lock" type="warning"></el-button>
        <el-button @click="updateModule(module, i)" circle icon="el-icon-upload" type="primary"></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  props: {
    moduleList: Array,
    disabled: Array,
    status: Array,
    showModuleName: {
      type: Boolean,
      default: false
    },
    showJumpModule: {
      type: Boolean,
      default: false
    },
    inputMaxRows: {
      type: Number,
      default: 4
    },
    anchor: String
  },
  methods: {
    uploadUrl() {
      return config.EXECUTE_POST_UPLOAD_IMAGE
    },
    /**
     * 状态显示值
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
     * 锁定
     */
    lockModule(index) {
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
    updateModule(module, index) {
      this.$set(this.disabled, index, true)
      this.$set(this.status, index, 2)

      console.log(module)
      var urlArr = module.url.split('/')

      this.$axios({
        method: 'post',
        url: config.EXECUTE_POST_UPDATE_IMAGE_MESSAGE,
        data: {
          id: module.id,
          url: urlArr[urlArr.length - 1],
          title: module.title,
          content: module.content,
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
     * 编辑
     */
    editModule(index) {
      this.$set(this.disabled, index, false)
      this.$set(this.status, index, 1)

      this.$notify({
        title: '编辑模式',
        message: '编辑模式已开启，当前可以进行模块部分图片上传及文本编辑！',
        type: 'success'
      })
    },
    /**
     * 文件上传成功时的钩子
     */
    handleModuleSuccess(req, file, imgList, index) {
      if (req.status === 200) {
        this.editModule(index)
        //  重置对象
        this.moduleList[index].url = req.url

        console.log(this.moduleList[index])
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
#module_edit
  .module-box
    display flex
    display -webkit-flex
    justify-content flex-start
    border-bottom 1px solid black
    padding 30px 0

    .el-form-item
      margin-bottom 10px !important

    .module-edit-message
      margin 0 50px
      width 100%

    .module-edit-button
      button
        margin 10px
        display block

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
