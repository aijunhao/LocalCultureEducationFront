<template>
  <div id="comments">
    <!-- 发表评论 -->
    <div class="comments-publish">
      <textarea
        autofocus
        class="comments-publish-text"
        placeholder="说点什么吧……"
        rows="3"
        v-model="myComment"
      ></textarea>
      <div class="comments-publish-button">
        <div class="comments-publish-button-picture">
          <span>表情</span>
          <span>图片</span>
        </div>
        <div @click="submitComment()" class="comments-publish-button-submit">提交</div>
      </div>
    </div>

    <el-divider>
      <i class="el-icon-menu"></i>
    </el-divider>

    <!-- 选项 -->
    <div class="comments-sort-type">
      <el-button @click="setSortType(0)" round>所有评论</el-button>
      <el-button @click="setSortType(1)" round>最新评论</el-button>
      <el-button @click="setSortType(2)" round>热门评论</el-button>
    </div>

    <el-divider>
      <i class="el-icon-chat-line-square"></i>
    </el-divider>

    <!-- 评论列表 -->
    <ul class="comments-list">
      <li :key="i" v-for="(item, i) in comments">
        <p>第 {{ i+1 }} 楼</p>
        <p>{{ item.content }}</p>
        <p>
          <span>{{ item.time | dataFormat() }}</span>
          <span @click="addThumbs(item.id)">
            <i class="myicons iconthumbsoup"></i>
            {{ item.thumbs }}
          </span>
        </p>
      </li>
    </ul>

    <!-- 评论见底 -->
    <p class="comments-end-tip">{{ tipText }}</p>

    <!-- 分页 -->
    <el-pagination
      :background="true"
      :current-page.sync="pages"
      :hide-on-single-page="hideSinglePage"
      :page-size="10"
      :total="commentNumber"
      @current-change="getComments()"
      layout="prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import config from '../config.js'

export default {
  props: ['id', 'commentNumber'],
  data() {
    return {
      pages: 1,
      comments: [],
      myComment: '',
      sortType: 1,
      hideSinglePage: true
    }
  },
  methods: {
    /**
     * 修改排序方式
     */
    setSortType(index) {
      this.sortType = index
      // 重置页码
      this.pages = 1
      // 重新加载数据
      this.getComments()
    },
    /**
     * 获取评论数据
     */
    getComments() {
      this.$axios({
        method: 'get',
        url:
          config.EXECUTE_COMMENTS + `/${this.id}/${this.pages}/${this.sortType}`
      })
        .then(data => {
          this.comments = data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 点赞
     * id: 评论的 id，不是图片的 id
     */
    addThumbs(id) {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_ADD_THUMBS + `/${id}`
      })
        .then(data => {
          if (data.status === 200) {
            // 重新加载数据
            this.getComments()
          } else {
            this.$message.error('很抱歉，点赞失败，请稍后再试')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * 提交评论
     */
    submitComment() {
      if (this.myComment != '') {
        this.$axios({
          method: 'post',
          url: config.EXECUTE_COMMENTS,
          data: {
            image_id: this.id,
            content: this.myComment
          }
        })
          .then(data => {
            if (data.status === 200) {
              this.$message('评论成功')
              // 重新加载数据
              this.getComments()
              // 自定义事件，给父组件发信息，刷新父组件页面
              this.$emit('reinit')
            } else {
              this.$message.error('服务器繁忙，请稍后再试。')
            }
          })
          .catch(err => {
            console.log('请求错误')
          })

        this.myComment = ''
      } else {
        this.$message.error('输入内容不能为空！')
      }
    }
  },
  created() {
    this.getComments()
  },
  computed: {
    tipText() {
      if (this.comments.length === 0) {
        return '评论列表空空如也，快来抢沙发吧！'
      } else {
        return '亲，已经加载完全部了呢！'
      }
    }
  }
}
</script>

<style lang="stylus">
#comments
  // 分页居中
  .el-pagination
    display flex
    justify-content center

  .comments-publish
    border-radius 5px
    border 1px solid #000
    overflow hidden

    .comments-publish-text
      resize none
      padding 2%
      margin 0
      width 96%
      border 0

    .comments-publish-button
      height 40px
      border-top 1px solid #000
      display flex
      display -webkit-flex
      justify-content space-between
      text-align center
      line-height 40px

      .comments-publish-button-picture span
        margin-left 20px

      .comments-publish-button-submit
        width 15%
        min-width 100px
        background #ccc

  .comments-sort-type
    margin 10px

  .comments-list
    list-style none
    padding 0
    margin 0

    li
      margin 5px 0
      min-height 50px
      padding 10px
      border-radius 5px
      border 1px solid #000

      p:first-child
        font-weight 600
        margin 0

      p:nth-child(2)
        margin 10px 0

      p:nth-child(3)
        margin 0
        line-height 16px

        span:first-child
          margin-right 30px

  .comments-end-tip
    text-align center
    font-size 0.8rem
</style>
