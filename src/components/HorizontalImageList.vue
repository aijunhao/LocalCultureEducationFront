<template>
  <div :style="{height: height + 'px'}" id="horizontal_image_list" ref="box">
    <ul :style="{width: width * imageList.length + 'px'}" id="list" ref="list">
      <li
        :key="i"
        :style="{width: width + 'px', height: height + 'px'}"
        @click="$emit('select', i)"
        v-for="(item, i) in imageList"
      >
        <img :src="item.img" alt />
        <p>{{ item.title }}</p>
      </li>
    </ul>
    <div @click="right()" class="left button">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div @click="left()" class="right button">
      <i class="el-icon-arrow-right"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['imageList', 'height', 'width'],
  data() {
    return {
      // 列表迁移量
      distance: 0,
      // document 对象
      list: '',
      boxWidth: 0
    }
  },
  mounted() {
    this.list = document.getElementById('list')
    this.$nextTick(() => {
      this.boxWidth = this.$refs.box.clientWidth
    })
  },
  methods: {
    left() {
      let total = this.boxWidth - this.imageList.length * this.width
      if (this.distance - this.width < total) {
        this.distance = total
        this.$message('已经是最后一个了呢')
      } else this.distance -= this.width
      this.move()
    },
    right() {
      if (this.distance + this.width > 0) {
        this.distance = 0
        this.$message('已经是第一个了呢')
      } else this.distance += this.width
      this.move()
    },
    move() {
      this.list.style.transform = `translateX(${this.distance}px)`
    }
  }
}
</script>

<style lang="stylus">
#horizontal_image_list
  position relative
  overflow hidden

  .button
    position absolute
    z-index 10
    background rgba(144, 147, 143, 0.7)
    width 30px
    display flex
    display -webkit-flex
    justify-content center
    align-items center
    height 100%

  .left
    left 0

  .right
    right 0

#list
  position absolute
  white-space nowrap
  width 2400px
  transition ease-in-out 0.5s

  li
    list-style none
    float left

    img
      width 100%
      height 100%

    p
      position relative
      top -40px
      z-index 1
      text-align center
      line-height 40px
      background rgba(255, 255, 255, 0.8)
      margin 0
</style>
