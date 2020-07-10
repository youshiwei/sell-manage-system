<template>
  <Panel>
    <!-- 标题 -->
    <h1 slot="title">个人中心</h1>
    <!-- 内容 -->
    <div slot="content"></div>
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