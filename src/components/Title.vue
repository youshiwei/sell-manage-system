<template>
  <h1>
    <!-- 插槽 -->
    <slot />
  </h1>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
h1 {
  font-size: 14px;
  line-height: 40px;
  padding-left: 20px;
  border-bottom: 1px solid #ddd;
}
</style>