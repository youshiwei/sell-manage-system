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

        <el-form-item label="用户组" prop="usergroup">
          <el-select v-model="value" placeholder="请选择用户组">
            <el-option label="高级管理员" value="高级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
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
import Panel from "@/components/Panel/Panel.vue";
export default {
  components: {
    Panel
  },
  data() {
    return {
      addForm: {
        account: "",
        password: "",
        usergroup: ["高级管理员", "普通管理员"]
      },
      rules: {
        account: { required: true, message: "请输入账号", trigger: "blur" },
        password: { required: true, message: "请输入密码", trigger: "blur" },
        usergroup: {
          required: true,
          message: "请输入用户组",
          trigger: "change"
        }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.addForm.validate(val => {
        if (val) {
          console.log("可以添加");
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