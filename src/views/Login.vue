<template>
  <div class="login">
    <div class="login-container">
      <div class="title">系统登录</div>
      <el-form :model="loginForm" :rules="rules" status-icon ref="loginForm">
        <!-- 账户 -->
        <el-form-item prop="account">
          <el-input prefix-icon="iconfont icon-denglu" type="text" v-model="loginForm.account"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            @click.native="changeEye"
            @keydown.native.enter="submitForm"
            prefix-icon="iconfont icon-mima"
            :suffix-icon="isOpen ? 'iconfont icon-yanjing':'iconfont icon-yanjing1'"
            :type="isOpen?'text':'password'"
            v-model="loginForm.password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Acc_Reg, Pwd_Reg } from "@/utils/reg";
import { checkLogin } from "@/api/account";
import local from "@/utils/local";
export default {
  data() {
    // 验证账号
    const checkAccount = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入账号"));
      } else if (!Acc_Reg.test(value)) {
        callback(new Error("3到12位（字母，数字，下划线，减号)"));
      } else {
        callback();
      }
    };
    // 验证密码
    const checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (!Acc_Reg.test(value)) {
        callback(new Error("3到12位（字母，数字，下划线，减号)"));
      } else {
        callback();
      }
    };

    return {
      model: "",
      isOpen: false,
      rules: {
        account: { validator: checkAccount, trigger: "blur" },
        password: { validator: checkPassword, trigger: "blur" }
      },
      loginForm: {
        account: "",
        password: ""
      }
    };
  },
  methods: {
    // 登录
    submitForm() {
      this.$refs.loginForm.validate(async validator => {
        if (validator) {
          // 发送登录ajax
          let { code, msg, token } = await checkLogin(this.loginForm);
          if (code === 0) {
            local.set("t_k", token);
            this.$router.push("/");
          }
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