<template>
  <div id="article_info_edit">
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
        <el-input v-model="article.time"  readonly placeholder="now"></el-input>
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
    <quill-editor :value="article.content" @save="save"></quill-editor>
  </div>
</template>

<script>
import config from '../../config'
import QuillEditor from '../../components/QuillEditor'

export default {
  props: ['article'],
  components: {
    'quill-editor': QuillEditor
  },
  methods: {
    /**
     * 保存文章
     * id 为空则新建，
     * id 不为空则更新
     */
    save(content) {
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
    cancel() {},
    del() {}
  }
}
</script>

<style lang="stylus">
// #article_info_edit
//   .article_info_button
//     margin 20px 0
//     text-align center

</style>

