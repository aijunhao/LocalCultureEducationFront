<template>
  <div id="article_info_edit">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>文章编辑</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 表单 -->
    <el-form label-width="100px">
      <el-form-item label="文章标题">
        <el-input v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="文章副标题">
        <el-input v-model="article.subtitle"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="article.author"></el-input>
      </el-form-item>
      <el-form-item label="发布时间">
        <el-input disabled placeholder="now" v-model="article.time"></el-input>
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
    article: {
      type: Object,
      require: true
    }
  },
  components: {
    'quill-editor': QuillEditor
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
            overview: this.article.overview
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

