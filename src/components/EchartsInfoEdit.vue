<template>
  <div id="echarts_info_edit">
    <div
      :class="['info-edit-box', anchor]"
      :id="idName + '_' + i"
      :key="i"
      v-for="(info, i) in infoList"
    >
      <div class="info-edit-title">
        <p v-text="info.title"></p>
      </div>

      <div class="info-edit-message">
        <el-form label-width="80px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称">
                <el-input
                  :disabled="disabled[i] === null ? true : disabled[i]"
                  v-model="info.title"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="颜色">
                <el-color-picker :disabled="disabled[i]" v-model="info.color"></el-color-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="数值">
                <el-input-number
                  :disabled="disabled[i]"
                  :precision="2"
                  :step="0.1"
                  size="medium"
                  v-model="info.data"
                ></el-input-number>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="比例">{{ getProportion(info.data) }}</el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="发布时间">
            <el-date-picker disabled format="yyyy-MM-dd HH:mm:ss" type="date" v-model="info.time"></el-date-picker>
          </el-form-item>

          <el-form-item label="内容">
            <el-input
              :autosize="{ minRows: 3, maxRows: 5}"
              :disabled="disabled[i]"
              placeholder="请输入内容"
              type="textarea"
              v-model="info.content"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="info-edit-setting">
        <!-- 状态 -->
        <p class="tips" v-text="status[i] ? status[i] : '已锁定...'"></p>
        <!-- 按钮 -->
        <el-button @click="editData(i)" circle icon="el-icon-edit" type="success"></el-button>
        <el-button @click="lockData(i)" circle icon="el-icon-lock" type="warning"></el-button>
        <el-button @click="updateData(info, i)" circle icon="el-icon-upload" type="primary"></el-button>
        <el-button @click="deleteData(i)" circle icon="el-icon-delete" type="danger"></el-button>
      </div>
    </div>

    <!-- 创建 -->
    <div class="info-edit-new">
      <p class="tips">添加</p>
      <el-button @click="newData()" circle icon="el-icon-plus" type="success"></el-button>
    </div>
  </div>
</template>

<script>
import config from '../config'

export default {
  props: {
    infoList: {
      type: Array,
      require: true
    },
    anchor: {
      type: String
    },
    idName: {
      type: String
    }
  },
  data() {
    return {
      total: 0,
      // 状态
      status: [],
      // 禁用
      disabled: [],
      // 数据库存储类型
      type: ''
    }
  },
  methods: {
    getProportion(number) {
      return ((parseFloat(number) / this.total) * 100).toFixed(1) + '%'
    },
    /**
     * 编辑图表数据
     */
    editData(index) {
      this.$set(this.disabled, index, false)
      this.$set(this.status, index, '编辑中...')

      this.$notify({
        title: '编辑模式',
        message: '编辑模式已开启，当前可以进行图表数据编辑！',
        type: 'success'
      })
    },
    /**
     * 锁定图表数据
     */
    lockData(index) {
      this.$set(this.disabled, index, true)
      this.$set(this.status, index, '已锁定...')

      this.$notify({
        title: '锁定模式',
        message:
          '锁定模式已开启，当前图表数据不可编辑！点击"编辑"按钮，可解锁为编辑模式。',
        type: 'success'
      })
    },
    /**
     * 更新图表数据
     */
    updateData(item, index) {
      this.$set(this.disabled, index, true)
      this.$set(this.status, index, '提交中...')

      this.$axios({
        method: 'post',
        url: config.EXECUTE_POST_UPDATE_CHART_DATA,
        data: {
          id: item.id,
          title: item.title,
          data: item.data,
          color: item.color,
          content: item.content
        }
      })
        .then(req => {
          if (req.status === 200) {
            this.$set(this.status, index, '已锁定...')
            this.$notify({
              title: '图表数据更新',
              message: '图表数据信息更新成功，模块已锁定。',
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '图表数据更新',
            message: '图表数据信息更新失败，请稍后再试',
            type: 'error'
          })
        })
    },
    /**
     * 创建图表数据
     */
    newData() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_NEW_CHART_DATA,
        params: {
          type: this.type
        }
      })
        .then(req => {
          if (req.status === 200) {
            this.infoList.push(req.data)

            this.$notify({
              title: '图表数据创建',
              message: '图表数据创建成功',
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '图表数据创建',
            message: '图表数据创建失败',
            type: 'error'
          })
        })
    },
    /**
     * 删除图表数据
     */
    deleteData(index) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          return this.$axios({
            method: 'get',
            url:
              config.EXECUTE_GET_DELETE_CHART_DATA +
              `/${this.infoList[index].id}`
          })
        })
        .then(req => {
          if (req.status === 200) {
            this.infoList.splice(index, 1)
            this.$notify({
              title: '图表数据刪除',
              message: '图表数据已删除成功',
              type: 'success'
            })
          }
        })
        .catch(err => {
          console.log(err)
          this.$notify({
            title: '图表数据刪除',
            message: '图表数据删除失败，已取消删除操作',
            type: 'success'
          })
        })
    }
  },
  watch: {
    infoList: {
      handler(newVal, oldVal) {
        this.type = newVal[0].type
        this.total = 0
        newVal.forEach(element => {
          this.disabled.push(true)
          this.status.push('已锁定...')
          this.total += parseFloat(element.data)
        })
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus">
#echarts_info_edit
  .tips
    font-size 0.9rem
    color #909399

  .info-edit-box
    display -webkit-flex
    display flex
    justify-content space-between
    border-bottom 1px solid black
    padding 30px 0

    .el-form-item
      margin-bottom 10px !important

    .el-date-editor.el-input, .el-date-editor.el-input__inner, .el-input-number--medium
      width 100%

    .el-form-item__content
      padding 0 !important
      height 40px

    .info-edit-title
      width 100px

      p
        text-align center
        font-size 1.5rem

    .info-edit-message
      width calc(100% - 260px)

    .info-edit-setting
      width 60px

      button
        margin 10px
        display block

  .info-edit-new
    display flex
    display -webkit-flex
    justify-content flex-end
    margin 20px 10px
    align-items center

    button
      margin-left 10px
</style>
