<template>
  <div id="user_edit">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-input placeholder="输入关键字搜索" v-model="search" />

    <el-table
      :data="userList.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()) || data.nickname.toLowerCase().includes(search.toLowerCase()) || data.id.includes(search))"
      max-height="800"
      ref="filterTable"
      style="width: 100%"
      v-if="userList"
    >
      <el-table-column fixed type="index"></el-table-column>
      <el-table-column fixed label="ID" prop="id" sortable width="100"></el-table-column>
      <el-table-column
        :filter-method="filterHandler"
        :filters="dateFilter"
        label="注册日期"
        prop="time"
        sortable
        width="120"
      ></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="昵称" prop="nickname"></el-table-column>

      <el-table-column
        :filter-method="filterUser"
        :filters="userFilter"
        label="用户类型"
        prop="powername"
        sortable
        width="130"
      >
        <template slot-scope="scope">
          <el-tag
            :type="tagColor(scope.row.power)"
            disable-transitions
          >{{ getPowername(scope.row.power) }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="deleteRow(scope.$index, userList)" size="small" type="danger">注销</el-button>
          <el-dropdown @command="handleCommand" size="small">
            <el-button size="small" type="primary">
              权限
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu size="small">
              <el-dropdown-item command="0">普通用户</el-dropdown-item>
              <el-dropdown-item command="5">被警告的用户</el-dropdown-item>
              <el-dropdown-item command="6">被冻结的用户</el-dropdown-item>
              <el-dropdown-item command="9">管理员</el-dropdown-item>
              <el-dropdown-item command="10">最高管理员</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
            console.log(req.data.data)
            this.userList = req.data.data
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
          this.$message.success('账户注销失败，请稍后再试！')
        })
    },
    handleCommand(command) {
      this.$message('click on item ' + command)
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
          '被警告的用户',
          '被冻结的用户',
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
.el-icon--right
  margin 0 !important
</style>