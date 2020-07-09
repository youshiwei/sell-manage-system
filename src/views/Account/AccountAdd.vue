<template>
  <div class="account-add">
    <Title>添加账号</Title>
    <div class="content">
      <div class="form">
        <el-form
          :model="addForm"
          status-icon
          :rules="rules"
          ref="addForm"
          label-width="100px"
          class="demo-addForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input type="text" v-model="addForm.account"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="用户组" prop="age">
            <el-select v-model="addForm.group" placeholder="请选择用户组">
              <el-option label="普通会员" value="putong"></el-option>
              <el-option label="高级会员" value="gaoji"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('addForm')">提交</el-button>
            <el-button @click="resetForm('addForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
export default {
  components: {
    Title
  },
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.addForm.checkPass !== "") {
          this.$refs.addForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.addForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      addForm: {
        account: "",
        password: "",
        group: ""
      },
      rules: {
        account: [{ validator: validatePass, trigger: "blur" }],
        password: [{ validator: validatePass2, trigger: "blur" }],
        group: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.account-add {
  width: 100%;
  background: #fff;
  .content {
    padding: 20px;
    .form {
      width: 400px;
      .el-select {
        width: 100%;
      }
    }
  }
}
</style>