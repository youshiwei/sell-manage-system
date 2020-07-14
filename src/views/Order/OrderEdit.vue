<template>
  <Panel>
    <h1 slot="title">订单编辑</h1>
    <div slot="content">
      <el-form label-width="80px" size="small" style="width:50%">
        <!-- 订单id -->
        <el-form-item label="订单ID">
          <el-input v-model="currentOrderEdit.id"></el-input>
        </el-form-item>
        <!-- 订单号 -->
        <el-form-item label="订单号">
          <el-input v-model="currentOrderEdit.orderNo"></el-input>
        </el-form-item>
        <!-- 下单时间 -->
        <el-form-item label="下单时间">
          <el-input v-model="currentOrderEdit.orderTime"></el-input>
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
          <el-input v-model="currentOrderEdit.deliveryTime"></el-input>
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
          <el-input v-model="currentOrderEdit.orderState"></el-input>
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
      currentOrderEdit: {}
    };
  }
};
</script>

<style lang="less" scoped>
</style>