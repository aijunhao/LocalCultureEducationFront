<template>
  <div id="login">
    <el-form
      :label-position="'top'"
      :model="loginRuleForm"
      :rules="rules"
      ref="loginRuleForm"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          autocomplete="off"
          placeholder="测试：guest / 管理员：admin"
          type="username"
          v-model="loginRuleForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          autocomplete="off"
          placeholder="测试：guest / 管理员：admin"
          show-password
          type="password"
          v-model="loginRuleForm.pass"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="login-button">
      <el-button
        :loading="loading"
        @click="checkForm('loginRuleForm')"
        type="success"
      >{{loading?'登录中': '登录'}}</el-button>
      <el-button @click="resetForm('loginRuleForm')">重置</el-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import config from '../../config.js'

export default {
  data() {
    // 用户名校验
    let usernameCheck = (rule, value, callback) => {
      this.$axios({
        method: 'post',
        url: config.EXECUTE_POST_USERNAME_CHECK,
        data: {
          username: this.loginRuleForm.username
        }
      })
        .then(req => {
          //   console.log(req)
          if (req.status === 200) {
            if (req.data.isExist) callback()
            else callback('用户名不存在')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    return {
      // 登录表单内容
      loginRuleForm: {
        username: '',
        pass: ''
      },
      // 登录加载
      loading: false,
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: usernameCheck, trigger: 'blur' }
        ],
        pass: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 表单检查
    checkForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.login(this.loginRuleForm.username, this.loginRuleForm.pass)
        } else {
          this.$message.error('用户名或密码错误，请重试!')
          return false
        }
      })
    },
    // 登录
    login(username, password) {
      this.loading = true
      this.$axios({
        method: 'post',
        url: config.EXECUTE_POST_LOGIN,
        data: {
          username: username,
          password: password
        }
      })
        .then(req => {
          if (req.status === 200) {
            // console.log(req.data)
            this.loading = false
            this.$message({
              message: `登录成功，欢迎您：${req.data.username}`,
              type: 'success'
            })
            // 存储到 vuex
            this.$store.dispatch('userStore', req.data)
            // 获取路由携带的路径并跳转
            let redirect = this.$route.query.redirect || '/'
            this.$router.push({ path: redirect })
          }
        })
        .catch(err => {
          this.loading = false
          this.$message.error('用户名或密码错误，请重试！')
          console.log(err)
        })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="stylus">
#login
  .login-button
    display flex
    display -webkit-flex
    justify-content space-between
    margin-top 20px

    button
      width 50% !important
</style>