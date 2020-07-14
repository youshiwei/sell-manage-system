<template>
  <div class="order-list">
    <!-- 查询表单 -->
    <el-form style="padding:20px;" :inline="true" :model="searchForm" class="demo-form-inline">
      <!-- 订单号 -->
      <el-form-item label="订单号">
        <el-input v-model="searchForm.orderNo" placeholder="订单号"></el-input>
      </el-form-item>
      <!-- 收货人 -->
      <el-form-item label="收货人">
        <el-input v-model="searchForm.consignee" placeholder="收货人"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机号">
        <el-input v-model="searchForm.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <!-- 订单状态 -->
      <el-form-item label="订单状态">
        <el-select v-model="searchForm.orderState" placeholder="订单状态">
          <el-option value="已受理">已受理</el-option>
          <el-option value="派送中">派送中</el-option>
          <el-option value="已完成">已完成</el-option>
        </el-select>
      </el-form-item>
      <!-- 下单时间 -->
      <el-form-item label="下单时间">
        <el-date-picker
          v-model="searchForm.date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </el-form-item>
      <!-- 查询按钮 -->
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width:100%">
      <!-- 订单号 -->
      <el-table-column fixed prop="orderNo" label="订单号" width="150"></el-table-column>
      <!-- 下单时间 -->
      <el-table-column prop="orderTime" label="下单时间" width="160"></el-table-column>
      <!-- 手机号 -->
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <!-- 收货人 -->
      <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
      <!-- 配送地址 -->
      <el-table-column prop="deliverAddress" label="配送地址" width="200"></el-table-column>
      <!-- 送达时间 -->
      <el-table-column prop="deliveryTime" label="送达时间" width="160"></el-table-column>
      <!-- 用户备注 -->
      <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
      <!-- 订单金额 -->
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <!-- 订单状态 -->
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top:20px;padding-left:20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import { getOrderList } from "@/api/order";
import Moment from "moment";
export default {
  data() {
    return {
      total: 0,
      currentPage: 1,
      pageSize: 5,
      searchForm: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: ""
      },
      tableData: []
    };
  },
  methods: {
    // 获取数据列表
    async fetchData() {
      let { data, total } = await getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.searchForm.orderNo,
        consignee: this.searchForm.consignee,
        phone: this.searchForm.phone,
        orderState: this.searchForm.orderState,
        date: this.searchForm.date
      });
      // 处理下单时间，送达时间
      data.forEach(v => {
        v.orderTime = Moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
        v.deliveryTime = Moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
      });
      this.tableData = data;
      this.total = total;
    },
    handleClick() {},
    search() {
      this.fetchData();
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="less" scoped>
.order-list {
  background-color: #fff;
  padding-bottom: 20px;
}
</style>