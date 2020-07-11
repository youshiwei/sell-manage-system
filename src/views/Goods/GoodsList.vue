<template>
  <Panel class="shop">
    <!-- 标题 -->
    <h1 slot="title">商品列表</h1>
    <!-- 内容 -->
    <div slot="content">主要内容</div>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel/Panel.vue";
export default {
  components: {
    Panel
  }
};
</script>

<style lang="less" scoped>
</style>