<template>
  <Panel>
    <!-- 标题 -->
    <h1 slot="title">修改密码</h1>
    <!-- 内容 -->
    <div slot="content">
      <el-form
        :model="modifyForm"
        status-icon
        :rules="rules"
        ref="modifyForm"
        label-width="100px"
        style="width:322px;"
      >
        <!-- 原密码 -->
        <el-form-item label="原密码" prop="oldPwd">
          <el-input type="password" v-model="modifyForm.oldPwd" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 新密码 -->
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="modifyForm.newPwd" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="checkPwd">
          <el-input type="password" v-model="modifyForm.checkPwd" autocomplete="off"></el-input>
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
      modifyForm: {
        oldPwd: "",
        newPwd: "",
        checkPwd: ""
      },
      rules: {
        oldPwd: { required: true, message: "请输入原密码", trigger: "blur" },
        newPwd: { required: true, message: "请输入新密码", trigger: "blur" },
        checkPwd: {
          required: true,
          message: "请输入确认密码",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.modifyForm.validate(val => {
        if (val) {
          console.log("可以修改");
        } else {
          console.log("修改失败");
        }
      });
    },
    resetForm() {
      this.$refs.modifyForm.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
</style>