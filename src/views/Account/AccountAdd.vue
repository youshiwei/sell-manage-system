<template>
  <Panel>
    <!-- 标题 -->
    <h1 slot="title">添加账号</h1>
    <!-- 内容 -->
    <div slot="content">
      <el-form
        :model="addForm"
        status-icon
        :rules="rules"
        ref="addForm"
        label-width="100px"
        style="width:322px;"
      >
        <!-- 账号 -->
        <el-form-item label="账号" prop="account">
          <el-input type="text" v-model="addForm.account" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="addForm.password" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 用户组 -->

        <el-form-item label="用户组" prop="userGroup">
          <el-select v-model="addForm.userGroup" placeholder="请输入用户组">
            <el-option value="超级管理员">超级管理员</el-option>
            <el-option value="普通管理员">普通管理员</el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Panel>
</template>

<script>
import { Acc_Reg, Pwd_Reg } from "@/utils/reg";
import Panel from "@/components/Panel/Panel.vue";
import { addAccount } from "@/api/account";
export default {
  components: {
    Panel
  },
  data() {
    const accValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入账号"));
      } else if (!Acc_Reg.test(value)) {
        callback(new Error("3到12位（字母，数字，下划线，中文)"));
      } else {
        callback();
      }
    };
    const pwdValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else if (!Pwd_Reg.test(value)) {
        callback(new Error("3到12位（字母，数字，下划线，减号)"));
      } else {
        callback();
      }
    };
    return {
      addForm: {
        account: "",
        password: "",
        userGroup: ""
      },
      rules: {
        account: { required: true, validator: accValidate, trigger: "blur" },
        password: { required: true, validator: pwdValidate, trigger: "blur" },
        userGroup: {
          required: true,
          message: "请输入用户组",
          trigger: "change"
        }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(async val => {
        if (val) {
          let { code } = await addAccount(this.addForm);
          if (code === 0) {
            this.$router.push("/account/account-list");
          }
        } else {
          console.log("无法提交");
        }
      });
    },
    resetForm() {
      this.$refs.addForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
</style>