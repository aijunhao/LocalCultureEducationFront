<template>
  <div id="nature">
    <ul id="nature_list">
      <router-link
        :key="i"
        :to="{ name: 'imageinfo', params: {imgObj: item}}"
        tag="li"
        v-for="(item, i) in initMessage.nature"
      >
        <el-image :src="item.img" fit="fill"></el-image>
        <div class="nature-list-description">
          <p class="nature-list-description-content">{{ item.content }}</p>
          <div class="nature-list-description-icon">
            <span>
              <i class="el-icon-view"></i>
              {{ item.lookedNumber }}
            </span>
            <span>
              <i class="el-icon-chat-dot-round"></i>
              {{ item.commentNumber }}
            </span>
          </div>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import config from '../config.js'

export default {
  data() {
    return {
      initMessage: {
        nature: [
          {
            title: '',
            content: '',
            commentNumber: 0,
            lookedNumber: 0,
            img: ''
          }
        ]
      }
    }
  },
  methods: {
    /**
     * 获取初始化数据
     */
    initNature() {
      this.$axios({
        method: 'get',
        url: config.EXECUTE_GET_NATURE_INIT
      })
        .then(data => {
          console.log(data.data)
          this.initMessage = data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  created() {
    this.initNature()
  }
}
</script>

<style lang="stylus">
#nature
  padding-top 100px

#nature_list
  list-style none
  padding 0
  margin 0

  >li
    border-radius 5px
    overflow hidden
    background #fff
    position relative
    

    .el-image
      width 100%
      height 100%
      min-height 250px

    .nature-list-description
      min-height 50px
      background rgba(144, 147, 153, 0.7)
      width 94%
      padding 3%
      position absolute
      bottom 0

      .nature-list-description-content
        width 100%
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        margin 0 0 5px

      .nature-list-description-icon
        display flex
        display -webkit-flex
        justify-content space-around

@media screen and (min-width: 960px)
  #nature_list
    display flex
    display -webkit-flex
    justify-content flex-start
    flex-wrap wrap

    li
      width 350px
      height 250px
      margin 5px

@media screen and (max-width: 960px)
  #nature_list
    li
      margin 5px 10px
      // width 100%
</style>