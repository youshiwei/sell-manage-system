<template>
  <div class="nav">
    <div class="shop-name">
      <img src="@/assets/imgs/food.svg" alt />
      <span>商家管理</span>
    </div>
    <el-menu
      :default-active="curActive"
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#246DED"
      unique-opened
      router
    >
      <template v-for="menu in menus">
        <!-- 动态导航 没有儿子 -->
        <el-menu-item
          v-if="menu.children && menu.children.length === 1 || menu.path=='/order'"
          :key="menu.path"
          :index="menu.children && menu.children.length && menu.children[0].path!=='' ? menu.children[0].path : menu.path"
        >
          <i :class="menu.meta.icon"></i>
          <span slot="title">{{menu.meta.title}}</span>
        </el-menu-item>

        <!-- 动态导航 有儿子 -->
        <el-submenu v-else :index="menu.path" :key="menu.path">
          <template slot="title">
            <i :class="menu.meta.icon"></i>
            <span>{{menu.meta.title}}</span>
          </template>

          <el-menu-item
            v-for="item in menu.children"
            :key="item.path"
            :index="item.path"
          >{{item.meta.title}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import local from "@/utils/local";
export default {
  data() {
    return {
      menus: []
    };
  },
  created() {
    // 获取当前菜单
    this.menus = local.get("menus");
  },
  computed: {
    curActive() {
      if (this.$route.path === "/order/order-edit") return "/order/order-list";
      return this.$route.path;
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  padding-top: 20px;
  flex: 0 0 200px;
  background-color: #304156;
  .shop-name {
    color: white;
    font-size: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .el-menu {
    border-right: none;
    .el-menu-item {
      i {
        color: #fff;
      }
    }
    .el-submenu {
      .el-submenu__title {
        i {
          color: #fff;
        }
      }
      .el-menu-item {
        background-color: #202f3f !important;
      }
    }
  }
}
</style>