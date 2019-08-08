<template>
  <div id="register">
    <el-form
      :label-position="'top'"
      :model="registerRuleForm"
      :rules="rules"
      ref="registerRuleForm"
      status-icon
    >
      <el-form-item label="用户名" prop="username">
        <el-input
          autocomplete="off"
          placeholder="用户名不可重复哦"
          type="username"
          v-model="registerRuleForm.username"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          autocomplete="off"
          placeholder="长度在 8 到 16 个字符之内"
          type="password"
          show-password
          v-model="registerRuleForm.pass"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          autocomplete="off"
          placeholder="请重复密码"
          show-password
          type="password"
          v-model="registerRuleForm.checkPass"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="register-button">
      <el-button @click="checkForm('registerRuleForm')" type="success">注册</el-button>
      <el-button @click="resetForm('registerRuleForm')">重置</el-button>
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
          username: this.registerRuleForm.username
        }
      })
        .then(req => {
          //   console.log(req)
          if (req.status === 200) {
            if (req.data.isExist) callback('当前用户名已存在')
            else callback()
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
    // 密码校验
    let checkPass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerRuleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      // 登录表单内容
      registerRuleForm: {
        username: '',
        pass: '',
        checkPass: ''
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { validator: usernameCheck, trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 4,
            max: 16,
            message: '长度在 4 到 16 个字符之内',
            trigger: 'blur'
          }
        ],
        checkPass: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          {
            min: 4,
            max: 16,
            message: '长度在 4 到 16 个字符之内',
            trigger: 'blur'
          },
          { validator: checkPass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表单检查
    checkForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.register(
            this.registerRuleForm.username,
            this.registerRuleForm.pass
          )
        } else {
          this.$message.error('用户名或密码错误，请重试!')
          return false
        }
      })
    },
    // 登录
    register(username, password) {
      this.$message({
        message: '&nbsp&nbsp注册中……',
        iconClass: 'el-icon-loading',
        dangerouslyUseHTMLString: true
      })
      this.$axios({
        method: 'post',
        url: config.EXECUTE_POST_REGISTER,
        data: {
          username: username,
          password: password
        }
      })
        .then(req => {
          if (req.status === 200) {
            console.log(req)
            this.$message({
              message: `注册成功，欢迎您：${req.data.username}`,
              type: 'success'
            })
            // 存储到 vuex
            this.$store.dispatch('userStore', req.data)
            // 获取路由携带的路径
            let redirect = decodeURIComponent(this.$route.query.redirect || '/')
            this.$router.push({ path: redirect })
          } else {
            this.$message.error('注册失败，请重试！')
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('注册失败，请重试！')
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
#register
  .register-button
    display flex
    display -webkit-flex
    justify-content space-between
    margin-top 20px

    button
      width 50% !important
</style>