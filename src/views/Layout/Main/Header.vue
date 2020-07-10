<template>
  <div class="header">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user">
      <el-dropdown>
        <span class="el-dropdown-link">
          你好，微微
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    calcBread() {
      console.log("计算面包屑", this.$route);
    }
  },
  created() {
    this.calcBread();
  },
  watch: {
    "$route.path"() {
      this.calcBread();
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  background-color: #fff;
  flex: 0 0 50px;
}
</style>