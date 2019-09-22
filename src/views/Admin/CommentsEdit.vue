<template>
  <div id="comments_edit">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="comments-search">
      <el-input placeholder="输入关键字搜索" v-model="search" />
    </div>

    <el-table
      :data="commentList.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()) || data.id.includes(search) || data.time.includes(search))"
      style="width: 100%"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column label="评论 ID" min-width="100" prop="id"></el-table-column>
      <el-table-column label="发布者用户名" min-width="130" prop="username" sortable></el-table-column>
      <el-table-column label="发布时间" min-width="170" prop="time" sortable></el-table-column>
      <el-table-column label="评论内容" prop="content" width="300"></el-table-column>
      <el-table-column label="点赞数" prop="thumbs"></el-table-column>
      <!-- 下拉按钮，隐藏部分 -->
      <el-table-column fixed="right" label="操作" type="expand">
        <template slot-scope="props">
          <!-- 发布者信息 -->
          <el-form
            class="demo-table-expand"
            label="发布者信息"
            label-position="left"
            label-width="100px"
          >
            <el-form-item label="发布者 ID">
              <span>{{ props.row.user_id }}</span>
            </el-form-item>
            <el-form-item label="用户名">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="发布者权限">
              <el-tag
                :type="$store.state.powerColor[props.row.power]"
                v-text="$store.state.powername[props.row.power]"
              ></el-tag>
            </el-form-item>
            <el-form-item label="评论详情">
              <el-input
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                resize="none"
                type="textarea"
                v-model="props.row.content"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                @click="deleteComments(props.$index, props.row.id)"
                icon="el-icon-delete"
                size="small"
                type="warning"
              >删除评论</el-button>
              <el-button
                :icon="isLoading === true ? 'el-icon-loading' : 'el-icon-upload'"
                @click="updateComments(props.row.id, props.row.content)"
                size="small"
                type="success"
              >更新评论</el-button>
              <el-button
                @click="waringUser()"
                icon="el-icon-warning-outline"
                size="small"
                type="warning"
              >警告用户</el-button>
              <el-button @click="lockUser()" icon="el-icon-lock" size="small" type="danger">冻结用户</el-button>
            </el-form-item>
          </el-form>
          <div class="comments-edit-button"></div>
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
      :total="commentNumber"
      @current-change="getComments()"
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
      // 评论列表
      commentList: [],
      // 评论数量
      commentNumber: 0,
      // 不足一页隐藏分页列表
      hideSinglePage: false,
      // 每页的数量
      pageSize: 10,
      // 加载图标
      isLoading: false,
      // 搜索
      search: ''
    }
  },
  methods: {
    // 每页条数切换
    handleSizeChange(val) {
      this.pageSize = val
      this.getComments()
    },
    // 获取评论总数
    getCommentNumber() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_COMMENTS_NUMMBER
      })
        .then(req => {
          this.commentNumber = req.data.number
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 获取评论数据
    getComments() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_COMMENTS_EXAMINE,
        params: {
          pages: this.pages,
          pageSize: this.pageSize
        }
      })
        .then(req => {
          // console.log(req)
          this.commentList = req.data
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
     * 冻结用户
     */
    lockUser() {
      console.log('冻结')
    },
    /**
     * 警告用户
     */
    waringUser() {
      console.log('警告')
    },
    /**
     * 删除评论
     */
    deleteComments(index, commentId) {
      // console.log(index, commentId)

      this.$confirm(`您正在删除用户评论，是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return this.$axios({
            method: 'get',
            url: config.EXECUTE_GET_DELETE_COMMENTS + `/${commentId}`
          })
        })
        .then(req => {
          if (req.status === 200) {
            this.$notify({
              title: '评论删除',
              message: `评论删除成功`,
              type: 'success'
            })
          }
          this.commentList.splice(index, 1)
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 更新评论
     */
    updateComments(id, content) {
      this.$confirm(`不建议修改用户发表的评论，是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return this.$axios({
            method: 'post',
            url: config.EXECUTE_POST_UPADTE_COMMENTS,
            data: {
              id,
              content
            }
          })
        })
        .then(req => {
          if (req.status === 200) {
            this.$notify({
              title: '评论修改',
              message: `修改成功`,
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.getCommentNumber()
    this.getComments()
  }
}
</script>

<style lang="stylus">
#comments_edit
  .comments-search
    width 300px
    margin 0 0 20px 0

  .demo-table-expand
    font-size 0

  .demo-table-expand label
    color #99a9bf

  .demo-table-expand .el-form-item
    margin-right 0
    margin-bottom 0

  .el-pagination
    margin 20px 0
    text-align center
</style>