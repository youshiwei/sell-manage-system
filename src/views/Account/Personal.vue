<template>
  <Panel>
    <!-- 标题 -->
    <h1 slot="title">个人中心</h1>
    <!-- 内容 -->
    <div slot="content">
      <p>
        管理员ID：
        <span>123</span>
      </p>
      <p>
        账号：
        <span>小貂禅</span>
      </p>
      <p>
        用户组：
        <span>超级管理员</span>
      </p>
      <p>
        创建时间：
        <span>2020/07/16</span>
      </p>
      <div class="avatar">
        管理员头像：
        <span>
          <img width="60" height="60" src="@/assets/imgs/we.jpg" alt />
        </span>
      </div>
    </div>
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
.content {
  p {
    line-height: 60px;
    border-bottom: 1px solid #ccc;
  }
  .avatar {
    display: flex;
    padding: 20px 0px;
    align-items: center;
  }
}
</style>