<template>
  <div id="userhome">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/' }">佛缘普陀</el-breadcrumb-item>
      <el-breadcrumb-item>用户中心</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="userhome-body">
      <!-- 用户信息 -->
      <div class="userhome-info">
        <img :src="user.portrait" class="avatar" />

        <el-button @click="visible = true " type="text">
          <i class="el-icon-edit"></i>编辑信息
        </el-button>
        <p>ID：{{ user.id }}</p>
        <p>用户名：{{ user.username }}</p>
        <p>用户权限：{{ user.powername }}</p>
        <p>
          个人介绍：
          <span v-if="user.info != ''">{{ user.info }}</span>
          <span v-else>这个人很懒，什么也没留下……</span>
        </p>
      </div>

      <div class="userhome-content">
        <p class="title">我的文章</p>
        <p class="tips">您暂无已发布的文章</p>
      </div>
    </div>

    <!-- 个人信息修改弹出框 -->
    <el-dialog :visible.sync="visible" title="个人信息修改">
      <!-- 上传 -->
      <el-upload
        :action="uploadUrl()"
        :on-success="handleAvatarSuccess"
        :show-file-list="false"
        class="avatar-uploader"
        list-type="picture-card"
      >
        <img :src="user.portrait" class="avatar" />
      </el-upload>

      <el-form class="table" label-position="left" label-width="80px">
        <el-form-item label="ID">
          <el-input disabled v-model="user.id"></el-input>
        </el-form-item>
        <el-form-item disabled label="用户名">
          <el-input disabled v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="user.nickname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group size="medium" v-model="user.gender">
            <el-radio-button label="男">
              <i class="el-icon-male"></i>男
            </el-radio-button>
            <el-radio-button label="女">
              女
              <i class="el-icon-female"></i>
            </el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker
            placeholder="选择日期"
            type="date"
            v-model="user.birthday"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="个人介绍">
          <el-input placeholder="这个人很懒，什么也没留下……" type="textarea" v-model="user.info"></el-input>
        </el-form-item>
      </el-form>

      <div class="dialog-footer" slot="footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button @click="submit()" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import config from '../../config'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['user'])
  },
  data() {
    return {
      // dialog 是否可见
      visible: false,
      // 加载中
      loading: true,
      currentDate: new Date()
    }
  },
  methods: {
    uploadUrl() {
      return config.EXECUTE_POST_UPLOAD_IMAGE
    },
    /**
     * 文件上传成功时的钩子
     */
    handleAvatarSuccess(req, file, imgList, index) {
      if (req.status === 200) {
        this.user.portrait = req.url
        console.log(req.url)
        this.$notify({
          title: '图片上传',
          message: '图片上传成功',
          type: 'success'
        })
      }
    },
    /**
     * 提交
     */
    submit() {
      this.visible = false
      var portrait = this.user.portrait.split('/')
      console.log(this.user)
      this.$axios({
        method: 'post',
        url: config.EXECUTE_POST_USER_INFO,
        data: {
          id: this.user.id,
          nickname: this.user.nickname,
          gender: this.user.gender === '男' ? 0 : 1,
          portrait: portrait[portrait.length - 1],
          birthday: this.user.birthday,
          info: this.user.info
        }
      })
        .then(req => {
          this.$message('个人信息修改成功')
          // 存储到 vuex
          this.$store.dispatch('userStore', req.data)
        })
        .catch(err => {
          console.log(err)
          this.$message.error('服务器繁忙，个人信息修改失败')
        })
    }
  }
}
</script>

<style lang="stylus">
#userhome
  p
    margin 5px 0

  .tips
    font-size 0.9rem
    color #909399

  .title
    font-size 1.2rem
    font-weight 600
    margin 0

  .avatar-uploader
    text-align center

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

  .avatar
    width 178px
    height 178px
    display block

  .el-form-item
    margin-bottom 10px

  .table
    padding 20px !important

@media screen and (max-width: 960px)
  #userhome
    padding 10px

@media screen and (min-width: 960px)
  #userhome
    padding 20px 15%

    .userhome-body
      display flex
      display -webkit-flex
      justify-content space-between

      .userhome-info
        width 200px

      .userhome-content
        width calc(100% - 209px)
</style>
