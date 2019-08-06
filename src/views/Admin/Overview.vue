<template>
  <div id="overview">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 64px">
      <el-breadcrumb-item :to="{ path: '/admin' }">管理员首页</el-breadcrumb-item>
      <el-breadcrumb-item>模块</el-breadcrumb-item>
      <el-breadcrumb-item>总览</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 用户登录注册统计图 -->
    <div class="login-statistics">
      <echarts :height="'350px'" :option="loginStatisticsOption"></echarts>
    </div>

    <div class="overview-user">
      <!-- 用户类型统计图 -->
      <echarts :height="'350px'" :option="userOption" :width="'40%'"></echarts>

      <!-- 用户信息 -->
      <div class="overview-user-table" v-if="userInfo != ''">
        <el-button @click="$router.push({ name: 'UserEdit'})" type="text">
          用户编辑
          <i class="myicons icondouble-up"></i>
        </el-button>
        <el-table
          :data="userInfo.data"
          border
          max-height="350"
          ref="filterTable"
          style="width: 100%"
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
            fixed="right"
            label="用户类型"
            prop="powername"
            sortable
            width="130"
          >
            <template slot-scope="scope">
              <el-tag :type="tagColor(scope.row.power)" disable-transitions>{{scope.row.powername}}</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from '../../components/Echarts'
import config from '../../config'

export default {
  components: {
    echarts: ECharts
  },
  data() {
    return {
      loginRegisterInfo: {},
      userInfo: {},
      // 时间过滤器
      dateFilter: [],
      // 用户过滤器
      userFilter: [],
      // 登录统计 option
      loginStatisticsOption: {
        title: {
          text: '佛缘普陀用户登录统计图'
        },
        xAxis: {
          boundaryGap: false,
          type: 'category',
          data: []
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['登录次数', '注册次数'],
          left: 'right',
          top: '20px'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '登录次数',
            data: [],
            type: 'line'
          },
          {
            name: '注册次数',
            data: [],
            type: 'line'
          }
        ]
      },
      // 用户比例 option
      userOption: {
        title: {
          text: '佛缘普陀用户比例统计图'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '用户比例',
            type: 'pie',
            radius: '70%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    /**
     * 获取登录注册数量信息
     */

    getUserLoginStatistics() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_LONGIN_AND_REGISTER_OVERVIEW
      })
        .then(req => {
          if (req.status === 200) {
            // console.log(req)
            this.loginRegisterInfo = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
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
            // console.log(req)
            this.userInfo = req.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    tagColor(type) {
      if (type === 10) return 'success'
      else if (type === 9) return 'primary'
      else if (type === 6) return 'danger'
      else if (type === 5) return 'warning'
      else return 'info'
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
    }
  },
  created() {
    this.getUserLoginStatistics()
    this.getUserAll()
  },
  watch: {
    loginRegisterInfo: {
      handler(newVal, oldVal) {
        this.loginStatisticsOption.xAxis.data = newVal.xAxis
        this.loginStatisticsOption.series[0].data = newVal.login
        this.loginStatisticsOption.series[1].data = newVal.register
      },
      deep: true
    },
    userInfo: {
      handler(newVal, oldVal) {
        this.userOption.series[0].data = newVal.chart

        // 数组去重
        let dateFilter = new Set()
        let userFilter = new Set()
        newVal.data.forEach(element => {
          dateFilter.add(element.time)
          userFilter.add(element.powername)
        })
        // 合成数据
        dateFilter.forEach(element => {
          this.dateFilter.push({
            text: element,
            value: element
          })
        })
        userFilter.forEach(element => {
          this.userFilter.push({
            text: element,
            value: element
          })
        })
      },
      deep: true
    }
  }
}
</script>

<style lang="stylus">
#overview
  .login-statistics
    display -webkit-flex
    display flex
    justify-content center

  .overview-user
    display -webkit-flex
    display flex
    justify-content space-between
    margin-top 20px

    .myicons
      font-size 16px

    .overview-user-table
      width calc(60% - 20px)
</style>
