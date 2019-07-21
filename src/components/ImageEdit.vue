<template>
  <div id="image_edit">
    <el-image :src="url" fit="fill" style="width: 300px; height: 200px"></el-image>
    <div>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['url']
}
</script>

