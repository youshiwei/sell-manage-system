<template>
  <Panel>
    <h1 slot="title">订单编辑</h1>
    <div slot="content">
      <el-form inline label-width="70px" size="small" style="width:100%">
        <!-- 订单id -->
        <el-form-item label="订单ID">
          <el-input disabled v-model="currentOrderEdit.id"></el-input>
        </el-form-item>
        <!-- 订单号 -->
        <el-form-item label="订单号">
          <el-input disabled v-model="currentOrderEdit.orderNo"></el-input>
        </el-form-item>
        <!-- 下单时间 -->
        <el-form-item label="下单时间">
          <el-date-picker
            disabled
            v-model="currentOrderEdit.orderTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <!-- 联系电话 -->
        <el-form-item label="联系电话">
          <el-input v-model="currentOrderEdit.phone"></el-input>
        </el-form-item>
        <!-- 收货人 -->
        <el-form-item label="收货人">
          <el-input v-model="currentOrderEdit.consignee"></el-input>
        </el-form-item>
        <!-- 送货地址 -->
        <el-form-item label="送货地址">
          <el-input v-model="currentOrderEdit.deliverAddress"></el-input>
        </el-form-item>
        <!-- 送达时间 -->
        <el-form-item label="送达时间">
          <el-date-picker
            v-model="currentOrderEdit.deliveryTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item label="备注">
          <el-input v-model="currentOrderEdit.remarks"></el-input>
        </el-form-item>
        <!-- 订单金额 -->
        <el-form-item label="订单金额">
          <el-input v-model="currentOrderEdit.orderAmount"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态">
          <el-select v-model="currentOrderEdit.orderState">
            <el-option value="已受理">已受理</el-option>
            <el-option value="派送中">派送中</el-option>
            <el-option value="已完成">已完成</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button @click="handleSubmit" type="success">提交</el-button>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel/Panel.vue";
import local from "@/utils/local";
import { modifyOrder } from "@/api/order";
export default {
  components: {
    Panel
  },
  data() {
    return {
      currentOrderEdit: {}
    };
  },
  methods: {
    async handleSubmit() {
      let { code } = await modifyOrder(this.currentOrderEdit);
      if (code === 0) {
        this.$router.push("/order/order-list");
      }
    }
  },
  created() {
    this.currentOrderEdit = local.get("orderData");
  }
};
</script>

<style lang="less" scoped>
</style>