<template>
  <div class="main">
    <!-- 头部 -->
    <Header />
    <!-- 路由出口 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
export default {
  components: {
    Header
  }
};
</script>

<style lang="less" scoped>
.main {
  overflow-x: scroll;
  flex: 1;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    background: #f0f2f5;
    overflow-y: scroll;
    padding: 20px;
  }
}
</style>