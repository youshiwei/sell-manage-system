<template>
  <Panel class="goods-add">
    <!-- 标题 -->
    <h1 slot="title">商品添加</h1>
    <!-- 内容 -->
    <div slot="content">
      <el-form ref="goods" :model="goods" label-width="80px" style="width:400px;">
        <!-- 商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="goods.name"></el-input>
        </el-form-item>
        <!-- 商品分类 -->
        <el-form-item label="商品分类">
          <el-select v-model="goods.category" style="width:320px">
            <el-option
              v-for="v in categories"
              :key="v.cateName"
              :value="v.cateName"
            >{{ v.cateName }}</el-option>
          </el-select>
        </el-form-item>
        <!-- 商品价格 -->
        <el-form-item label="商品价格">
          <el-input-number v-model="goods.price" :min="0" :max="100" label="描述文字"></el-input-number>
        </el-form-item>
        <!-- 商品图片 -->
        <el-form-item label="商品图片">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            :on-success="handleAvatarSuccess"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="goods.imgUrl" :src="imgBaseUrl+goods.imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <el-input type="textarea" autosize v-model="goods.goodsDesc"></el-input>
        </el-form-item>
        <!-- 添加商品按钮 -->
        <el-form-item label>
          <el-button size="small" type="primary" @click="handleAddGoods">添加商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel/Panel.vue";
import { addGoods, getGoodsCateName } from "@/api/goods";
import local from "@/utils/local";
export default {
  components: {
    Panel
  },
  data() {
    return {
      imgBaseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/", // 图片所在服务的文件夹的位置【目录】
      goods: {
        name: "",
        category: "",
        price: "",
        imgUrl: "",
        goodsDesc: ""
      },
      categories: [] //已启用的商品分类名字
    };
  },
  methods: {
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
    handleAvatarSuccess(res) {
      //上传图片响应数据
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg });
        this.goods.imgUrl = imgUrl;
        console.log(this.goods);
      }
    },
    async handleAddGoods() {
      let { code } = await addGoods(this.goods); // 添加商品发送请求函数
      if (code === 0) {
        this.$router.push("/goods/goods-list");
      }
    }
  },
  async created() {
    let { categories } = await getGoodsCateName();
    local.set(
      "categories",
      categories.map(v => {
        return v.cateName;
      })
    );

    this.categories = categories; //数组
  }
};
</script>

<style lang="less" scoped>
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