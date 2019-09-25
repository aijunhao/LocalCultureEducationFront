<template>
  <div id="article_info_edit">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
      <el-breadcrumb-item><strong @click="$router.go(-1)" class="btn-text">返回上一级</strong></el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单 -->

    <el-form label-width="100px">
      <el-form-item label="文章标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="文章副标题">
        <el-input v-model="article.subtitle"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="发布者">
            <el-input v-model="article.author"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="来源">
            <el-input v-model="article.source"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-form-item label="发布时间">
        <el-input disabled placeholder="now" v-model="article.time"></el-input>
      </el-form-item>-->
      <el-form-item label="发布时间">
        <el-date-picker
          disabled
          format="yyyy-MM-dd HH:mm:ss"
          type="date"
          v-model="article.time === '' ? defaultTime : article.time"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="文章总览">
        <el-input
          :autosize="{ minRows: 2, maxRows: 6}"
          placeholder="请输入内容"
          type="textarea"
          v-model="article.overview"
        ></el-input>
      </el-form-item>
    </el-form>

    <!-- 富文本编辑器 -->
    <quill-editor
      :value="article.content"
      @cancel="cancelArticle"
      @delete="deleteArticle"
      @save="saveArticle"
    ></quill-editor>
  </div>
</template>

<script>
import config from '../../config'
import QuillEditor from '../../components/QuillEditor'

export default {
  props: {
    value: {
      type: Object,
      require: true
    },
    type: {
      type: Number,
      default: 1
    }
  },
  components: {
    'quill-editor': QuillEditor
  },
  data() {
    return {
      defaultTime: new Date()
    }
  },
  computed: {
    article: function() {
      if (this.value) {
        sessionStorage.setItem('article', JSON.stringify(this.value))
        return this.value
      } else return JSON.parse(sessionStorage.getItem('article'))
    }
  },
  methods: {
    /**
     * 保存文章
     * id 为空则新建，
     * id 不为空则更新
     */
    saveArticle(content) {
      if (this.article.id) {
        this.$axios({
          method: 'post',
          url: config.EXECUTE_POST_UPDATE_ARTICLE_MESSAGE,
          data: {
            id: this.article.id,
            title: this.article.title,
            subtitle: this.article.subtitle,
            author: this.article.author,
            content: content,
            overview: this.article.overview
          }
        })
          .then(req => {
            if (req.status === 200) {
              this.$notify({
                title: '文章更新',
                message: '文章更新成功',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '文章更新',
                message: '文章更新失败',
                type: 'error'
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        console.log(this.article)
        this.$axios({
          method: 'post',
          url: config.EXECUTE_POST_NEW_ARTICLE,
          data: {
            title: this.article.title,
            subtitle: this.article.subtitle,
            author: this.article.author,
            content: content,
            overview: this.article.overview,
            type: this.type
          }
        })
          .then(req => {
            if (req.status === 200) {
              this.$notify({
                title: '文章发布',
                message: '文章发布成功',
                type: 'success'
              })
            } else {
              this.$notify({
                title: '文章发布',
                message: '文章发布失败',
                type: 'error'
              })
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    /**
     * 取消
     */
    cancelArticle() {
      this.$confirm('此操作将不会保存已编辑内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push({ name: 'CultureEdit' })
        })
        .catch(() => {})
    },
    /**
     * 删除
     */
    deleteArticle() {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.article.id)
            this.$axios({
              method: 'get',
              url: config.EXECUTE_GET_DELETE_ARTICLE + `/${this.article.id}`
            }).then(req => {
              // console.log(req)
              if (req.status == 200) {
                this.$notify({
                  title: '刪除',
                  message: '文章已删除成功',
                  type: 'success'
                })
              }
            })

          this.$router.push({ name: 'CultureEdit' })
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '刪除',
            message: '文章删除失败，已取消删除操作',
            type: 'success'
          })
        })
    }
  }
}
</script>

<style lang="stylus">
#article_info_edit
  .el-date-editor.el-input, .el-date-editor.el-input__inner
    width 100%

  .btn-text:hover
    color #409EFF
    font-weight 600
    cursor pointer
</style>
