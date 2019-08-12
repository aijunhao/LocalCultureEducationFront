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
      max-height="800"
      ref="filterTable"
      style="width: 100%"
      v-if="userList"
    >
      <el-table-column fixed type="index"></el-table-column>
      <el-table-column fixed label="ID" min-width="100" prop="id" sortable></el-table-column>
      <el-table-column
        :filter-method="filterHandler"
        :filters="dateFilter"
        label="注册日期"
        min-width="140"
        prop="time"
        sortable
      ></el-table-column>
      <el-table-column label="用户名" min-width="100" prop="username"></el-table-column>
      <el-table-column label="昵称" min-width="100" prop="nickname"></el-table-column>
      <el-table-column label="性别">
        <template slot-scope="scope">{{ scope.row.gender === 0 ? '男' : '女' }}</template>
      </el-table-column>

      <el-table-column
        :filter-method="filterUser"
        :filters="userFilter"
        label="用户状态"
        min-width="120"
        prop="powername"
        sortable
      >
        <template slot-scope="scope">
          <el-tag
            :type="tagColor(scope.row.power)"
            disable-transitions
          >{{ getPowername(scope.row.power) }}</el-tag>
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
              <el-dropdown-item command="0">取消所有权限</el-dropdown-item>
              <el-dropdown-item command="5">警告</el-dropdown-item>
              <el-dropdown-item command="6">冻结</el-dropdown-item>
              <el-dropdown-item command="9">设置为管理员</el-dropdown-item>
              <el-dropdown-item command="10">设置为最高管理员</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button @click="deleteRow(scope.$index, userList)" size="small" type="danger">注销</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import config from '../../config'

export default {
  data() {
    return {
      userList: [],
      // 时间过滤器
      dateFilter: [],
      // 用户过滤器
      userFilter: [],
      // 搜索
      search: ''
    }
  },
  methods: {
    /**
     * 获取所有用户
     */
    getUserAll() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_USER_ALL
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
     * 时间过滤器
     */
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    },
    /**
     * 用户过滤器
     */
    filterUser(value, row) {
      return row.powername === value
    },
    /**
     * 删除,
     * index: 序号
     * rows: userList 用户列表
     */
    deleteRow(index, rows) {
      this.$confirm(
        `您正在注销账户，用户名： ${rows[index].username}，是否继续?`,
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
              id: rows[index].id
            }
          })
        })
        .then(req => {
          if (req.status === 200) {
            rows.splice(index, 1)
            this.$message.success('账户注销成功！')
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.error('您已取消账户注销操作！')
        })
    },
    /**
     * 权限操作
     */
    handleCommand(command, scope) {
      // console.log(command, scope)
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
              message: `您已成功将 “${scope.row.id}” 号用户权限设置为 “${this.getPowername(scope.row.power)}” `,
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  computed: {
    /**
     * 权限名称
     */
    getPowername() {
      return index => {
        let powername = [
          '普通用户',
          '普通用户',
          '普通用户',
          '普通用户',
          '普通用户',
          '已警告',
          '已冻结',
          '管理员',
          '管理员',
          '管理员',
          '超级管理员'
        ]
        return powername[index]
      }
    },
    /**
     * 标签颜色
     */
    tagColor() {
      return type => {
        let color = [
          'info',
          'info',
          'info',
          'info',
          'info',
          'warning',
          'danger',
          'primary',
          'primary',
          'primary',
          'success'
        ]
        return color[type]
      }
    }
  },
  created() {
    this.getUserAll()
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
</style>