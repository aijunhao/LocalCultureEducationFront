<template>
  <div id="text_edit">
    <div :key="i" class="text-edit-box" v-for="(item, i) in textList">
      <div class="text-edit-title">
        <p v-text="item.title"></p>
      </div>

      <div class="text-edit-message">
        <el-form label-width="80px">
          <el-form-item label="姓名">
            <el-input :disabled="disabled[i]" v-model="item.title"></el-input>
          </el-form-item>
          <el-form-item label="朝代">
            <el-select :disabled="disabled[i]" placeholder="请选择" v-model="item.subtitle">
              <el-option
                :key="option.value"
                :label="option.label"
                :value="option.value"
                v-for="option in options"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-input :disabled="disabled[i]" v-model="item.time"></el-input>
          </el-form-item>
          <el-form-item label="发布者">
            <el-input :disabled="disabled[i]" v-model="item.author"></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input :disabled="disabled[i]" v-model="item.source"></el-input>
          </el-form-item>
          <el-form-item label="介绍">
            <el-input
              :autosize="{ minRows: 2, maxRows: 5}"
              :disabled="disabled[i]"
              placeholder="请输入内容"
              type="textarea"
              v-model="item.content"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="text-edit-setting">
        <!-- 状态 -->
        <p class="tips" v-text="status[i]"></p>
        <!-- 按钮 -->
        <el-button @click="editText(i)" circle icon="el-icon-edit" type="success"></el-button>
        <el-button @click="lockText(i)" circle icon="el-icon-lock" type="warning"></el-button>
        <el-button @click="updateText(item, i)" circle icon="el-icon-upload" type="primary"></el-button>
        <el-button @click="deleteText(i)" circle icon="el-icon-delete" type="danger"></el-button>
      </div>
    </div>

    <!-- 创建 -->
    <div class="text-edit-new">
      <p class="tips">添加</p>
      <el-button @click="newText()" circle icon="el-icon-plus" type="success"></el-button>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  props: {
    textList: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      // 选择器
      options: [
        {
          value: '不详',
          label: '不详'
        },
        {
          value: '南宋',
          label: '南宋'
        },
        {
          value: '元代',
          label: '元代'
        },
        {
          value: '明代',
          label: '明代'
        },
        {
          value: '清代',
          label: '清代'
        },
        {
          value: '晚唐及民国',
          label: '晚唐及民国'
        },
        {
          value: '游山',
          label: '游山'
        },
        {
          value: '当代',
          label: '当代'
        }
      ],
      status: [''],
      disabled: [''],
      // 数据库存储类型
      type: ''
    }
  },
  methods: {
    /**
     * 编辑文本
     */
    editText(index) {
      this.$set(this.disabled, index, false)
      this.$set(this.status, index, '编辑中...')

      this.$notify({
        title: '编辑模式',
        message: '编辑模式已开启，当前可以进行文本编辑！',
        type: 'success'
      })
    },
    /**
     * 锁定文本
     */
    lockText(index) {
      this.$set(this.disabled, index, true)
      this.$set(this.status, index, '已锁定...')

      this.$notify({
        title: '锁定模式',
        message:
          '锁定模式已开启，当前文本不可编辑！点击"编辑"按钮，可解锁为编辑模式。',
        type: 'success'
      })
    },
    /**
     * 更新文本
     */
    updateText(item, index) {
      this.$set(this.disabled, index, true)
      this.$set(this.status, index, '提交中...')

      this.$axios({
        method: 'post',
        url: config.EXECUTE_POST_UPDATE_TEXT,
        data: {
          id: item.id,
          title: item.title,
          subtitle: item.subtitle,
          source: item.source,
          content: item.content
        }
      })
        .then(req => {
          if (req.status === 200) {
            this.$set(this.status, index, '已锁定...')
            this.$notify({
              title: '文本更新',
              message: '文本信息更新成功，模块已锁定。',
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '文本更新',
            message: '文本信息更新失败，请稍后再试',
            type: 'error'
          })
        })
    },
    /**
     * 创建文本
     */
    newText() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_NEW_TEXT + `/${this.type}`
      })
        .then(req => {
          if (req.status === 200) {
            this.textList.push(req.data)

            this.$notify({
              title: '文本创建',
              message: '文本创建成功',
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '文本创建',
            message: '文本创建失败',
            type: 'error'
          })
        })
    },
    /**
     * 删除文本
     */
    deleteText(index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return this.$axios({
            method: 'get',
            url: config.EXECUTE_GET_DELETE_TEXT + `/${this.textList[index].id}`
          })
        })
        .then(req => {
          if (req.status === 200) {
            this.textList.splice(index, 1)
            this.$notify({
              title: '文本刪除',
              message: '文本已删除成功',
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '文本刪除',
            message: '文本删除失败，已取消删除操作',
            type: 'success'
          })
        })
    }
  },
  watch: {
    textList: function(newVal, oldVal) {
      this.disabled = new Array(newVal.length).fill(true)
      this.status = new Array(newVal.length).fill('已锁定...')
      this.type = newVal[0].type
    }
  }
}
</script>

<style lang="stylus">
#text_edit
  .tips
    font-size 0.9rem
    color #909399

  .text-edit-box
    display -webkit-flex
    display flex
    justify-content space-between
    border-bottom 1px solid black
    padding 30px 0

    .el-form-item
      margin-bottom 10px !important

    .el-select
      display block

    .text-edit-title
      width 100px

      p
        text-align center
        font-size 40px
        writing-mode vertical-rl
        height 330px

    .text-edit-message
      width calc(100% - 260px)

    .text-edit-setting
      width 60px
      padding-top 30px

      button
        margin 10px
        display block

  .text-edit-new
    display flex
    display -webkit-flex
    justify-content flex-end
    margin 20px 10px
    align-items center

    button
      margin-left 10px
</style>
