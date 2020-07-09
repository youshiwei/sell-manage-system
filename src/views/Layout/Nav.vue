<template>
  <div class="nav">
    <el-menu
      :default-active="curActive"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#246DED"
      unique-opened
      router
    >
      <!-- 后台首页 -->
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>

      <!-- 订单管理 -->
      <el-menu-item index="/order/order-list">
        <i class="el-icon-s-order">&emsp;</i>
        <span slot="title">订单管理</span>
      </el-menu-item>

      <!-- 商品管理*3 -->
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-shopping-bag-2"></i>
          <span>商品管理</span>
        </template>
        <el-menu-item index="/goods/goods-list">商品列表</el-menu-item>
        <el-menu-item index="/goods/goods-add">商品添加</el-menu-item>
        <el-menu-item index="/goods/goods-cate">商品分类</el-menu-item>
      </el-submenu>

      <!-- 店铺管理 -->
      <el-menu-item index="/shop">
        <i class="el-icon-s-shop"></i>
        <span slot="title">店铺管理</span>
      </el-menu-item>

      <!-- 账户管理*4 -->
      <el-submenu index="5">
        <template slot="title">
          <i class="el-icon-user-solid"></i>
          <span>账户管理</span>
        </template>
        <el-menu-item index="/account/account-list">账号列表</el-menu-item>
        <el-menu-item index="/account/account-add">添加账号</el-menu-item>
        <el-menu-item index="/account/pass-modify">修改密码</el-menu-item>
        <el-menu-item index="/account/personal">个人中心</el-menu-item>
      </el-submenu>
      <!-- 销售统计*2 -->

      <el-submenu index="6">
        <template slot="title">
          <i class="el-icon-pie-chart"></i>
          <span>销售统计</span>
        </template>
        <el-menu-item index="/total/goods-total">商品统计</el-menu-item>
        <el-menu-item index="/total/order-total">订单统计</el-menu-item>
      </el-submenu>

      <!-- 有儿子 -->
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
      </el-submenu>-->

      <!-- 没有儿子 -->
      <!-- <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    curActive() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  flex: 0 0 200px;
  background-color: #304156;
  .el-menu {
    border-right: none;
    .el-submenu .el-menu-item {
      background-color: #202f3f !important;
    }
  }
}
</style>