<template>
  <Panel>
    <h1 slot="title">标题</h1>
    <div slot="content">内容</div>
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