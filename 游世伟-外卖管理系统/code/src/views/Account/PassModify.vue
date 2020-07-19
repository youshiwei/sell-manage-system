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
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input type="password" v-model="modifyForm.confirmPwd" autocomplete="off"></el-input>
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
import { checkOldPwd, modifyPwd } from "@/api/account";
import local from "@/utils/local";
export default {
  components: {
    Panel
  },
  data() {
    // 旧密码
    const oldValidate = async (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入原密码"));
      } else {
        let { code } = await checkOldPwd({ oldPwd: value });
        if (code === "00") {
          callback();
        } else {
          callback(new Error("原密码错误，请重新输入"));
        }
      }
    };
    // 新密码
    const pwdValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      } else if (!Pwd_Reg.test(value)) {
        callback(new Error("3到12位（字母，数字，下划线，减号)"));
      } else {
        // 来一波反向验证
        if (this.modifyForm.confirmPwd !== "") {
          //确保确认密码不为空 触发反向一致性验证
          this.$refs.modifyForm.validateField("confirmPwd");
        }
        callback();
      }
    };
    // 确认密码
    const confirmValidate = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.modifyForm.newPwd) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      modifyForm: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      rules: {
        oldPwd: { validator: oldValidate, trigger: "blur" },
        newPwd: { validator: pwdValidate, trigger: "blur" },
        confirmPwd: { validator: confirmValidate, trigger: "blur" }
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.modifyForm.validate(async val => {
        if (val) {
          let { code } = await modifyPwd({ newPwd: this.modifyForm.newPwd });
          if (code === 0) {
            // 修改密码成功，清除本地，跳转到登录
            local.clear();
            this.$router.push("/login");
          }
        } else {
          console.log("修改失败");
          return false;
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