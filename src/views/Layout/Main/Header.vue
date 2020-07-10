<template>
  <div class="header">
    <el-row>
      <el-col :span="12">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item
            v-for="item in breadArr"
            :key="item.title"
            :to="{path:item.path}"
          >{{ item.title }}</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="12">
        <div class="user">
          <el-dropdown>
            <span class="el-dropdown-link">
              你好，微微
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item to="{path:'/account/personal'}">个人中心</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      breadArr: [] //面包屑数组
    };
  },
  methods: {
    calcBread() {
      // 计算面包屑数组
      let arr = [{ title: "首页", path: "/home" }];
      this.$route.matched.forEach(v => {
        if (v.meta && v.meta.title) {
          arr.push({
            title: v.meta.title,
            path: v.path
          });
        }
      });
      this.breadArr = arr;
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
  padding: 0 20px;
  box-sizing: border-box;
  background-color: #fff;
  flex: 0 0 50px;
  .el-row {
    height: 100%;
    .el-col {
      height: 100%;
      display: flex;
      align-items: center;
      .user {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        .el-avatar {
          margin-left: 20px;
        }
      }
    }
  }
}
</style>