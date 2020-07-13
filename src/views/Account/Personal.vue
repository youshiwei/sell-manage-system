<template>
  <Panel>
    <!-- 标题 -->
    <h1 slot="title">个人中心</h1>
    <!-- 内容 -->
    <div slot="content">
      <p>
        管理员ID：
        <span>{{userinfo.id}}</span>
      </p>
      <p>
        账号：
        <span>{{ userinfo.account}}</span>
      </p>
      <p>
        用户组：
        <span>{{userinfo.userGroup}}</span>
      </p>
      <p>
        创建时间：
        <span>{{ userinfo.ctime | timeformat}}</span>
      </p>
      <div class="avatar-box">
        管理员头像：
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/users/avatar_upload"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imgUrl" :src="imgBaseUrl+imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-button @click="modifyAvatar" type="primary" size="small">确认修改</el-button>
      </div>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel/Panel.vue";
import local from "@/utils/local";
import Moment from "moment";
import { avatarEdit } from "@/api/account";
export default {
  components: {
    Panel
  },
  data() {
    return {
      userinfo: {},
      imgUrl: "", //图片名称
      imgBaseUrl: "http://127.0.0.1:5000/upload/imgs/acc_img/" // 图片所在服务的文件夹的位置【目录】
    };
  },

  methods: {
    handleAvatarSuccess(res) {
      //上传头像响应数据
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg });
        this.imgUrl = imgUrl;
      }
    },
    beforeAvatarUpload(file) {
      // 上传文件之前 对文件的大小 类型 进行限制。
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    async modifyAvatar() {
      let { code } = await avatarEdit({ imgUrl: this.imgUrl });
      if (code === 0) {
        this.$bus.$emit("update_avatar");
      }
    }
  },
  created() {
    this.userinfo = local.get("user");
  },
  filters: {
    timeformat(time) {
      return Moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  p {
    line-height: 60px;
    border-bottom: 1px solid #ccc;
  }
  .avatar-box {
    padding: 20px 0px;
    /deep/ .avatar-uploader .el-upload {
      margin: 20px 0;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>