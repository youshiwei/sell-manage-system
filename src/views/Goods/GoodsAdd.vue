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
          <el-input v-model="goods.cate"></el-input>
        </el-form-item>
        <!-- 商品价格 -->
        <el-form-item label="商品价格">
          <el-input-number
            v-model="goods.price"
            @change="handleChange"
            :min="1"
            :max="10"
            label="描述文字"
          ></el-input-number>
        </el-form-item>
        <!-- 商品图片 -->
        <el-form-item label="商品图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <el-input type="textarea" autosize v-model="textarea1"></el-input>
        </el-form-item>
        <!-- 添加商品按钮 -->
        <el-form-item label>
          <el-button type="primary">添加商品</el-button>
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
      dialogImageUrl: "",
      dialogVisible: false,
      textarea1: "",
      goods: {
        name: "",
        cate: "",
        price: "",
        imgUrl: "",
        des: ""
      }
    };
  },
  methods: {
    handleChange() {},
    handleRemove() {},
    handlePictureCardPreview() {}
  }
};
</script>

<style lang="less" scoped>
</style>