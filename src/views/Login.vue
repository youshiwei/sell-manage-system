<template>
  <div class="login">
    <div class="login-container">
      <div class="title">系统登录</div>
      <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm" class="demo-loginForm">
        <!-- 账户 -->
        <el-form-item prop="account">
          <el-input prefix-icon="iconfont icon-denglu" type="text" v-model="loginForm.account"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            @click.native="changeEye"
            prefix-icon="iconfont icon-mima"
            :suffix-icon="isOpen ? 'iconfont icon-yanjing':'iconfont icon-yanjing1'"
            :type="isOpen?'text':'password'"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: "",
      isOpen: false,
      rules: {
        account: { required: true, message: "请输入账号", trigger: "blur" },
        password: [
          { min: 4, max: 8, message: "密码长度为4-8位字符", trigger: "blur" },
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      },
      loginForm: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.loginForm.validate(validator => {
        if (validator) {
          console.log("可以提交 发送ajax");
          // 消息提示
          this.$message({
            message: "恭喜你，登录成功！",
            type: "success"
          });
          // 跳转
          this.$router.push("/");
        } else {
          console.log("前端验证不通过，不可提交");
        }
      });
    },
    changeEye(e) {
      if (e.target.className.includes("yanjing")) {
        this.isOpen = !this.isOpen;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2d3a4b;
  .title {
    color: #fff;
    line-height: 60px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }
  .login-container {
    width: 400px;
    .el-form-item {
      .el-input {
        /deep/ .el-input__inner {
          background-color: transparent;
          color: #fff;
        }
      }
      .el-button {
        width: 100%;
      }
    }
  }
}
</style>