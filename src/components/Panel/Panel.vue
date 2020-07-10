<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <!-- 标题插槽 -->
      <slot name="title" />
    </div>
    <div class="content-container">
      <slot name="content" />
    </div>
  </el-card>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}
</style>