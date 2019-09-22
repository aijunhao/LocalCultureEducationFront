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
      <div class="overview-user-table">
        <el-button @click="$router.push({ name: 'UserEdit'})" type="text">
          用户编辑
          <i class="myicons icondouble-up"></i>
        </el-button>
        <el-table :data="userList" border max-height="350" ref="filterTable" style="width: 100%">
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
              <el-tag
                :type="tagColor(scope.row.power)"
                disable-transitions
                effect="dark"
              >{{ getPowername(scope.row.power) }}</el-tag>
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
      userList: [],
      // 时间过滤器
      dateFilter: [],
      // 用户过滤器
      userFilter: [
        { text: '普通用户', value: '普通用户' },
        { text: '被警告的用户', value: '被警告的用户' },
        { text: '账户被冻结的用户', value: '账户被冻结的用户' },
        { text: '管理员', value: '管理员' },
        { text: '超级管理员', value: '超级管理员' }
      ],
      // 权限名
      powername: [
        '普通用户',
        '普通用户',
        '普通用户',
        '普通用户',
        '普通用户',
        '已警告的用户',
        '已冻结的用户',
        '管理员',
        '管理员',
        '管理员',
        '超级管理员'
      ],
      // 标签颜色
      color: [
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
      ],
      // 登录统计 option
      loginStatisticsOption: {
        title: {
          text: '佛缘普陀登录及注册统计图'
        },
        legend: {
          data: ['登录次数', '注册次数', '管理员登录次数', '普通用户登录次数'],
          left: 'center',
          top: '20'
        },
        toolbox: {
          feature: {
            dataZoom: {},
            magicType: {
              type: ['line', 'bar']
            },
            saveAsImage: {},
            restore: {}
          },
          right: '40'
        },
        dataZoom: [
          {
            type: 'inside',
            show: true
          },
          {
            type: 'slider',
            show: true,
            bottom: 'bottom'
          }
        ],
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          boundaryGap: false,
          type: 'category',
          name: '日期',
          data: [],
          nameTextStyle: {
            fontWeight: '600',
            fontSize: '14'
          },
          axisLabel: {
            margin: 15
          }
        },
        yAxis: {
          name: '次数',
          type: 'value',
          nameTextStyle: {
            fontWeight: '600',
            fontSize: '14'
          }
        },
        series: [
          {
            name: '登录次数',
            data: [],
            type: 'line',
            markPoint: {
              data: [{ type: 'max', name: '最大值' }]
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          },
          {
            name: '管理员登录次数',
            data: [],
            type: 'line',
            markPoint: {
              data: [{ type: 'max', name: '最大值' }]
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          },
          {
            name: '普通用户登录次数',
            data: [],
            type: 'line',
            markPoint: {
              data: [{ type: 'max', name: '最大值' }]
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          },
          {
            name: '注册次数',
            data: [],
            type: 'line',
            markPoint: {
              data: [{ type: 'max', name: '最大值' }]
            }
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

            this.loginStatisticsOption.xAxis.data = req.data.xAxis
            this.loginStatisticsOption.series[0].data = req.data.login
            this.loginStatisticsOption.series[1].data = req.data.admin
            this.loginStatisticsOption.series[2].data = req.data.normal
            this.loginStatisticsOption.series[3].data = req.data.register
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
        url: config.EXECUTE_GET_USER,
        params: {
          pages: 0
        }
      })
        .then(req => {
          if (req.status === 200) {
            // console.log(req)
            this.userList = req.data

            // 用户权限统计数组
            let userPower = new Array(11).fill(0)
            // 用户比例图表数据
            let userChart = []
            // 时间过滤器
            let dateFilter = new Set()
            this.userList.forEach(element => {
              dateFilter.add(element.time)
              userPower[element.power]++
            })
            // 合成数据
            dateFilter.forEach(element => {
              this.dateFilter.push({
                text: element,
                value: element
              })
            })
            userPower.forEach((element, i) => {
              if (element != 0) {
                userChart.push({
                  value: element,
                  name: this.powername[i]
                })
              }
            })

            this.userOption.series[0].data = userChart
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
      return this.getPowername(row.power) === value
    }
  },
  computed: {
    /**
     * 权限名称
     */
    getPowername() {
      return index => {
        return this.powername[index]
      }
    },
    /**
     * 标签颜色
     */
    tagColor() {
      return type => {
        return this.color[type]
      }
    }
  },
  created() {
    this.getUserLoginStatistics()
    this.getUserAll()
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
