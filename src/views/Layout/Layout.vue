<template>
  <div class="layout">
    <!-- 左侧导航 -->
    <Nav />
    <!-- 右侧主体 -->
    <Main />
  </div>
</template>

<script>
import Nav from "./Nav.vue";
import Main from "./Main/Main.vue";
export default {
  components: {
    Nav,
    Main
  }
};
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  height: 100%;
}
</style>