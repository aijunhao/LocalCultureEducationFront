<template>
  <div id="location">
    <div class="space-between">
      <div class="location-description">
        <p>{{ description }}</p>
      </div>

      <div class="location-map">
        <el-radio-group @change="jumpTo" v-model="radio" class="location-map-radio">
          <el-radio-button label="0">省份</el-radio-button>
          <el-radio-button label="1">市区</el-radio-button>
          <el-radio-button label="2">详细</el-radio-button>
        </el-radio-group>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: 0,
      description: '嘉兴位于中国浙江省'
    }
  },
  methods: {
    jumpTo(value){
      console.log(typeof value)
      if(value === '0') {
        this.$router.push('/location/chinamap')
      } else if (value === '1') {
        this.$router.push('/location/zhejiangmap')
      } else {
        this.$router.push('/location/baidumap')
      }
    }
  },
}
</script>

<style lang="stylus">
#location
  margin-top 95px

  .space-between
    display flex
    display -webkit-flex
    justify-content space-between

  .location-description
    background #fff
    border-radius 5px
    padding 10px
    margin-left 10px
    min-width 220px
    text-align center

  .location-map
    width 100%
    position relative
    
    .location-map-radio
      position absolute 
      margin-left 10px
      top 5px
      z-index 100
</style>
