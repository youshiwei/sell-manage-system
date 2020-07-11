<template>
  <Panel class="shop">
    <!-- 标题 -->
    <h1 slot="title">店铺管理</h1>
    <!-- 内容 -->
    <div slot="content">
      <el-form :model="shopForm" ref="shopForm" label-width="68px" style="width:400px">
        <!-- 店铺名称 -->
        <el-form-item label="店铺名称" prop="name">
          <el-input type="text" v-model="shopForm.name"></el-input>
        </el-form-item>
        <!-- 店铺公告 -->
        <el-form-item label="店铺公告" prop="notice">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="shopForm.notice"></el-input>
        </el-form-item>
        <!-- 店铺头像 -->
        <el-form-item label="店铺头像" prop="imgUrl">
          <el-avatar shape="square" :size="100" :fit="fit" :src="shopForm.imgUrl"></el-avatar>
        </el-form-item>
        <!-- 店铺图片 -->
        <el-form-item label="店铺图片">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <!-- 配送费 -->
        <el-form-item label="配送费" prop="deliveryFee">
          <el-input type="number" v-model="shopForm.deliveryFee"></el-input>
        </el-form-item>
        <!-- 配送时间 -->
        <el-form-item label="配送时间" prop="deliveryTime">
          <el-input type="number" v-model="shopForm.deliveryTime"></el-input>
        </el-form-item>
        <!-- 配送描述 -->
        <el-form-item label="配送描述" prop="deliveryDes">
          <el-input type="text" v-model="shopForm.deliveryDes"></el-input>
        </el-form-item>
        <!-- 店铺评分 -->
        <el-form-item label="店铺评分" prop="score">
          <el-input type="number" v-model="shopForm.score"></el-input>
        </el-form-item>
        <!-- 销量 -->
        <el-form-item label="销量" prop="sales">
          <el-input type="number" v-model="shopForm.sales"></el-input>
        </el-form-item>
        <!-- 活动 -->
        <el-form-item label="活动" prop="activeList">
          <el-checkbox-group v-model="shopForm.activeList">
            <el-checkbox checked label="在线支付满28减5"></el-checkbox>
            <el-checkbox checked label="VC无限橙果汁全场8折"></el-checkbox>
            <el-checkbox checked label="单人精彩套餐"></el-checkbox>
            <el-checkbox label="特价饮品8折抢购"></el-checkbox>
            <el-checkbox label="单人特色套餐"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <!-- 营业时间 -->
        <el-form-item label="营业时间" prop="businessTime">
          <el-time-picker
            is-range
            v-model="shopForm.businessTime"
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
export default {
  components: {
    Panel
  },
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: true,
      fileList: [
        {
          url: require("@/assets/imgs/we.jpg")
        },
        {
          url: require("@/assets/imgs/we.jpg")
        }
      ],
      shopForm: {
        name: "大米先生（天府新谷）",
        notice:
          "大米先生位于天马公寓家润多负一楼乐活汇内，大米先生是一家连锁餐饮企业，用最好的原材料，以最好的服务回馈消费者！大米先生欢迎您的光临，适宜无线上网",
        imgUrl: require("@/assets/imgs/we.jpg"),
        deliveryFee: 4,
        deliveryTime: 38,
        deliveryDes: "蜂鸟专送",
        score: 3.5,
        sales: 100,
        activeList: [],
        businessTime: ""
      }
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>

<style lang="less" scoped>
</style>