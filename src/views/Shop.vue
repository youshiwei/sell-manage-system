<template>
  <Panel class="shop">
    <!-- 标题 -->
    <div slot="title" class="title">
      <span>店铺管理</span>
      <el-button
        @click="handleEdit"
        size="mini"
        :type="isEdit? 'success':'primary'"
      >{{ isEdit? "完成" : "编辑" }}</el-button>
    </div>
    <!-- <el-button>编辑</el-button> -->
    <!-- 内容 -->
    <div slot="content">
      <el-form
        :disabled="isEdit? false : true"
        :model="shopForm"
        ref="shopForm"
        label-width="68px"
        style="width:400px"
      >
        <!-- 店铺名称 -->
        <el-form-item label="店铺名称" prop="name">
          <el-input type="text" v-model="shopForm.name"></el-input>
        </el-form-item>
        <!-- 店铺公告 -->
        <el-form-item label="店铺公告" prop="bulletin">
          <el-input type="textarea" autosize v-model="shopForm.bulletin"></el-input>
        </el-form-item>
        <!-- 店铺头像 -->
        <el-form-item label="店铺头像" prop="avatar">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/shop/upload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="shopForm.avatar" :src="imgBaseUrl+shopForm.avatar" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 店铺图片 -->
        <el-form-item label="店铺图片">
          <el-upload
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :file-list="shopForm.pics"
            :on-preview="handlePictureCardPreview"
            :on-success="handleImgSuccess"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>

        <!-- 配送费 -->
        <el-form-item label="配送费" prop="deliveryPrice">
          <el-input type="number" v-model="shopForm.deliveryPrice"></el-input>
        </el-form-item>
        <!-- 配送时间 -->
        <el-form-item label="配送时间" prop="deliveryTime">
          <el-input type="index" v-model="shopForm.deliveryTime"></el-input>
        </el-form-item>
        <!-- 配送描述 -->
        <el-form-item label="配送描述" prop="description">
          <el-input type="text" v-model="shopForm.description"></el-input>
        </el-form-item>
        <!-- 店铺评分 -->
        <el-form-item label="店铺评分" prop="score">
          <el-input type="number" v-model="shopForm.score"></el-input>
        </el-form-item>
        <!-- 销量 -->
        <el-form-item label="销量" prop="sellCount">
          <el-input type="number" v-model="shopForm.sellCount"></el-input>
        </el-form-item>
        <!-- 活动 -->
        <el-form-item label="活动" prop="supports">
          <el-checkbox-group v-model="shopForm.supports">
            <el-checkbox label="在线支付满28减5"></el-checkbox>
            <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
            <el-checkbox label="单人精彩套餐"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购"></el-checkbox>
            <el-checkbox label="单人特色套餐"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 营业时间 -->
        <el-form-item label="营业时间" prop="date">
          <el-time-picker
            is-range
            v-model="shopForm.date"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          ></el-time-picker>
        </el-form-item>
      </el-form>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel/Panel.vue";
import { getShopInfo, modifyShopInfo } from "@/api/shop";
export default {
  components: {
    Panel
  },
  data() {
    return {
      list: [],
      isEdit: false,
      dialogImageUrl: "",
      dialogVisible: false,
      imgBaseUrl: "http://127.0.0.1:5000/upload/shop/",
      shopForm: {
        id: "",
        name: "",
        bulletin: "",
        avatar: "",
        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        supports: [],
        date: [],
        minPrice: "",
        pics: []
      }
    };
  },
  methods: {
    //编辑
    async handleEdit() {
      this.isEdit = !this.isEdit;
      if (!this.isEdit) {
        let arr = this.shopForm.pics.map(v => v.name);
        await modifyShopInfo({
          id: 1,
          name: this.shopForm.name,
          bulletin: this.shopForm.bulletin,
          avatar: this.shopForm.avatar,
          deliveryPrice: this.shopForm.deliveryPrice,
          deliveryTime: this.shopForm.deliveryTime,
          description: this.shopForm.description,
          score: this.shopForm.score,
          sellCount: this.shopForm.sellCount,
          minPrice: JSON.stringify(this.shopForm.date),

          // 参数处理
          supports: JSON.stringify(this.shopForm.supports),
          date: JSON.stringify(this.shopForm.date),
          pics: JSON.stringify(arr)
        });
      }
    },
    // 上传头像预设
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
    // 头像上传成功回调
    handleAvatarSuccess(res) {
      //上传头像响应数据
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg });
        this.shopForm.avatar = imgUrl;
      }
    },
    // 上传照片墙成功回调
    handleImgSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg });
        this.shopForm.pics.push({
          name: imgUrl,
          url: this.imgBaseUrl + imgUrl
        });
      }
    },
    // 删除图片
    handleRemove(file) {
      this.shopForm.pics.forEach((v, i) => {
        if (v.uid === file.uid) {
          this.shopForm.pics.splice(i, 1);
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  async created() {
    let { data } = await getShopInfo();
    this.shopForm = data;
    this.shopForm.pics = this.shopForm.pics.map(v => ({
      name: v,
      url: this.imgBaseUrl + v
    }));
  }
};
</script>

<style lang="less" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
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
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>