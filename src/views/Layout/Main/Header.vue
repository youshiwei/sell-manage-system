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
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              你好，{{account}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout">退出系统</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-avatar :src="imgUrl"></el-avatar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import local from "@/utils/local";
import { getPersonalInfo } from "@/api/account";
export default {
  data() {
    return {
      breadArr: [], //面包屑数组
      account: "",
      imgUrl: ""
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
    },
    // 点击下拉菜单选项
    handleCommand(cmd) {
      if (cmd == "personal") {
        this.$router.push("/account/personal");
      } else {
        this.$message({ type: "success", message: "哥哥，欢迎下次再来！" });
        local.clear(); //清空本地
        this.$router.push("/login"); //跳转到登录
      }
    },
    async fetchData() {
      let res = await getPersonalInfo();
      this.account = res.account;
      this.imgUrl = res.imgUrl;
      local.set("user", res); //用户信息存入本地
    }
  },
  created() {
    this.fetchData();
    this.calcBread();
    // 接收个人中心的通知
    this.$bus.$on("update_avatar", () => {
      this.fetchData();
    });
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