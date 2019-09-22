<template>
  <div id="user_edit">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="user-search">
      <el-input placeholder="输入关键字搜索" v-model="search" />
    </div>

    <el-table
      :data="userList.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()) || data.nickname.toLowerCase().includes(search.toLowerCase()) || data.id.includes(search))"
      ref="filterTable"
      style="width: 100%"
      v-if="userList"
    >
      <el-table-column fixed type="index"></el-table-column>
      <el-table-column fixed label="ID" min-width="100" prop="id" sortable></el-table-column>
      <el-table-column label="注册日期" min-width="140" prop="time" sortable></el-table-column>
      <el-table-column label="用户名" min-width="100" prop="username"></el-table-column>
      <el-table-column label="昵称" min-width="100" prop="nickname"></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">{{ scope.row.gender === 0 ? '男' : '女' }}</template>
      </el-table-column>

      <el-table-column
        :filter-method="filterUser"
        :filters="userFilter"
        label="用户权限"
        min-width="120"
        prop="powername"
        sortable
      >
        <template slot-scope="scope">
          <el-tag
            :type="$store.state.powerColor[scope.row.power]"
            disable-transitions
            v-text="$store.state.powername[scope.row.power]"
          ></el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" min-width="150">
        <template slot-scope="scope">
          <el-dropdown @command="(command) => handleCommand(command, scope)" size="small">
            <el-button size="small" type="primary">
              权限
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu size="small">
              <el-dropdown-item disabled>权限选择：</el-dropdown-item>
              <el-dropdown-item command="10" divided>超级管理员</el-dropdown-item>
              <el-dropdown-item command="9">管理员</el-dropdown-item>
              <el-dropdown-item command="6">冻结</el-dropdown-item>
              <el-dropdown-item command="5">警告</el-dropdown-item>
              <el-dropdown-item command="0">取消所有权限</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button @click="deleteRow(scope, userList)" size="small" type="danger">注销</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      :background="true"
      :current-page.sync="pages"
      :hide-on-single-page="hideSinglePage"
      :page-size="pageSize"
      :page-sizes="[10, 20, 50, 100]"
      :total="userNumber"
      @current-change="getUser()"
      @size-change="handleSizeChange"
      layout="total, sizes, prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import config from '../../config'

export default {
  data() {
    return {
      // 当前页
      pages: 1,
      // 评论数量
      userNumber: 1,
      // 不足一页隐藏分页列表
      hideSinglePage: false,
      // 每页的数量
      pageSize: 10,
      // 用户列表
      userList: [],
      // 时间过滤器
      dateFilter: [],
      // 用户过滤器
      userFilter: [
        { text: '超级管理员', value: 10 },
        { text: '管理员', value: 9 },
        { text: '已冻结', value: 6 },
        { text: '已警告', value: 5 },
        { text: '普通用户', value: 0 }
      ],
      // 搜索
      search: ''
    }
  },
  methods: {
    /**
     * 页面改变
     */
    handleSizeChange(val) {
      this.pageSize = val
      this.getUser()
    },
    /**
     * 获取用户
     */
    getUser() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_USER,
        params: {
          pages: this.pages,
          pageSize: this.pageSize
        } 
      })
        .then(req => {
          if (req.status === 200) {
            // console.log(req.data)
            this.userList = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 获取用户总数
     */
    getUserNumber() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_USER_NUMBER
      })
        .then(req => {
          // console.log(req.data.number)
          this.userNumber = req.data.number
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 用户过滤器
     */
    filterUser(value, row) {
      return row.power == value
    },
    /**
     * 删除
     * scope: 目标行数据
     *    $index: 序号
     *    row.power: 目标用户的权限的等级
     * rows: userList 用户列表
     */
    deleteRow(scope, rows) {
      console.log(scope, rows)
      // 先获取实际下标，scope.$index 只是筛选后序列的序号，不是原序列的序号
      let index
      this.userList.forEach((user, i) => {
        if (user.id == scope.row.id) index = i
      })

      // 权限判断，只能注销比自己权限低的用户
      if (this.$store.state.user.power > scope.row.power) {
        this.$confirm(
          `您正在注销账户，用户名： ${scope.row.username}，是否继续?`,
          '提示',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
          .then(() => {
            return this.$axios({
              method: 'get',
              url: config.EXECUTE_GET_DELETE_USER,
              params: {
                id: scope.row.id
              }
            })
          })
          .then(req => {
            if (req.status === 200) {
              this.userList.splice(index, 1)
              this.$message.success('账户注销成功！')
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.error('您已取消账户注销操作！')
          })
      } else {
        this.$notify.error({
          title: '账户注销',
          message: '抱歉，您只能注销比您权限低的用户！'
        })
      }
    },
    /**
     * 权限操作
     * command: 权限等级
     */
    handleCommand(command, scope) {
      console.log(command, scope)

      if (this.$store.state.user.id === scope.row.id) {
        // 不能修改自身等级
        this.$notify.error({
          title: '权限修改',
          message: '抱歉，您无法修改自身权限等级！'
        })
      } else if (scope.row.power >= 9 && this.$store.state.user.power != 10) {
        // 超级管理员可以设置管理员以上用户权限
        this.$notify.error({
          title: '权限修改',
          message: '抱歉，此用户权限过高，您无权修改！'
        })
      } else if (command > this.$store.state.user.power) {
        // 不能设置权限等级超过自身权限等级
        this.$notify.error({
          title: '权限修改',
          message: '抱歉，您无法设置用户权限等级超过自身权限等级！'
        })
      } else {
        // 正常情况下，设置权限
        this.$axios({
          method: 'post',
          url: config.EXECUTE_POST_UPADTE_USER_POWER,
          data: {
            id: scope.row.id,
            power: command
          }
        })
          .then(req => {
            if (req.status === 200) {
              // console.log(req)
              scope.row.power = command
              this.$notify({
                title: '权限修改',
                message: `您已成功将 “${scope.row.id}” 号用户权限设置为 “${
                  this.$store.state.powername[scope.row.power]
                }” `,
                type: 'success'
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  created() {
    this.getUserNumber()
    this.getUser()
  }
}
</script>

<style lang="stylus">
#user_edit
  .el-icon--right
    margin 0 !important

  .user-search
    width 300px
    margin 0 0 20px 0

  .el-pagination
    margin 20px 0
    text-align center
</style>