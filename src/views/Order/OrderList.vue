<template>
  <div class="order-list">
    <!-- 查询表单 -->
    <el-form style="padding:20px;" :inline="true" :model="formInline" class="demo-form-inline">
      <!-- 订单号 -->
      <el-form-item label="订单号">
        <el-input v-model="formInline.orderNumber" placeholder="订单号"></el-input>
      </el-form-item>
      <!-- 收货人 -->
      <el-form-item label="收货人">
        <el-input v-model="formInline.orderNumber" placeholder="收货人"></el-input>
      </el-form-item>
      <!-- 手机号 -->
      <el-form-item label="手机号">
        <el-input v-model="formInline.phone" placeholder="手机号"></el-input>
      </el-form-item>
      <!-- 订单状态 -->
      <el-form-item label="订单状态">
        <el-select v-model="formInline.orderStatus" placeholder="订单状态">
          <el-option value="已受理">已受理</el-option>
        </el-select>
      </el-form-item>
      <!-- 选择时间 -->
      <el-form-item label="选择时间">
        <el-date-picker
          v-model="value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        ></el-date-picker>
      </el-form-item>
      <!-- 查询按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width:100%">
      <!-- 订单号 -->
      <el-table-column fixed prop="orderNumber" label="订单号" width="150"></el-table-column>
      <!-- 下单时间 -->
      <el-table-column prop="orderTime" label="下单时间" width="120"></el-table-column>
      <!-- 手机号 -->
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <!-- 收货人 -->
      <el-table-column prop="receiver" label="收货人" width="120"></el-table-column>
      <!-- 配送地址 -->
      <el-table-column prop="address" label="配送地址" width="300"></el-table-column>
      <!-- 送达时间 -->
      <el-table-column prop="deliveryTime" label="送达时间" width="120"></el-table-column>
      <!-- 用户备注 -->
      <el-table-column prop="userSpare" label="用户备注" width="120"></el-table-column>
      <!-- 订单金额 -->
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <!-- 订单状态 -->
      <el-table-column prop="orderStatus" label="订单状态" width="120"></el-table-column>
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
export default {
  data() {
    return {
      total: 219,
      currentPage: 1,
      pageSize: 20,
      formInline: {
        orderNumber: "",
        receiver: "",
        phone: "",
        orderStatus: "",
        period: ""
      },
      value2: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      tableData: [
        {
          orderNumber: 1424007586,
          orderStatus: "已受理",
          orderAmount: 49,
          orderTime: "17:01",
          phone: "1570****583",
          receiver: "张一达",
          address: "成都市高新区天华路219号天府软件园C10栋11层",
          deliveryTime: "19:23",
          userSpare: "微辣"
        },
        {
          orderNumber: 1424007586,
          orderStatus: "已受理",
          orderAmount: 49,
          orderTime: "17:01",
          phone: "1570****583",
          receiver: "张一达",
          address: "成都市高新区天华路219号天府软件园C10栋11层",
          deliveryTime: "19:23",
          userSpare: "微辣"
        },
        {
          orderNumber: 1424007586,
          orderStatus: "已受理",
          orderAmount: 49,
          orderTime: "17:01",
          phone: "1570****583",
          receiver: "张一达",
          address: "成都市高新区天华路219号天府软件园C10栋11层",
          deliveryTime: "19:23",
          userSpare: "微辣"
        },
        {
          orderNumber: 1424007586,
          orderStatus: "已受理",
          orderAmount: 49,
          orderTime: "17:01",
          phone: "1570****583",
          receiver: "张一达",
          address: "成都市高新区天华路219号天府软件园C10栋11层",
          deliveryTime: "19:23",
          userSpare: "微辣"
        },
        {
          orderNumber: 1424007586,
          orderStatus: "已受理",
          orderAmount: 49,
          orderTime: "17:01",
          phone: "1570****583",
          receiver: "张一达",
          address: "成都市高新区天华路219号天府软件园C10栋11层",
          deliveryTime: "19:23",
          userSpare: "微辣"
        },
        {
          orderNumber: 1424007586,
          orderStatus: "已受理",
          orderAmount: 49,
          orderTime: "17:01",
          phone: "1570****583",
          receiver: "张一达",
          address: "成都市高新区天华路219号天府软件园C10栋11层",
          deliveryTime: "19:23",
          userSpare: "微辣"
        },
        {
          orderNumber: 1424007586,
          orderStatus: "已受理",
          orderAmount: 49,
          orderTime: "17:01",
          phone: "1570****583",
          receiver: "张一达",
          address: "成都市高新区天华路219号天府软件园C10栋11层",
          deliveryTime: "19:23",
          userSpare: "微辣"
        },
        {
          orderNumber: 1424007586,
          orderStatus: "已受理",
          orderAmount: 49,
          orderTime: "17:01",
          phone: "1570****583",
          receiver: "张一达",
          address: "成都市高新区天华路219号天府软件园C10栋11层",
          deliveryTime: "19:23",
          userSpare: "微辣"
        },
        {
          orderNumber: 1424007586,
          orderStatus: "已受理",
          orderAmount: 49,
          orderTime: "17:01",
          phone: "1570****583",
          receiver: "张一达",
          address: "成都市高新区天华路219号天府软件园C10栋11层",
          deliveryTime: "19:23",
          userSpare: "微辣"
        },
        {
          orderNumber: 1424007586,
          orderStatus: "已受理",
          orderAmount: 49,
          orderTime: "17:01",
          phone: "1570****583",
          receiver: "张一达",
          address: "成都市高新区天华路219号天府软件园C10栋11层",
          deliveryTime: "19:23",
          userSpare: "微辣"
        },
        {
          orderNumber: 1424007586,
          orderStatus: "已受理",
          orderAmount: 49,
          orderTime: "17:01",
          phone: "1570****583",
          receiver: "张一达",
          address: "成都市高新区天华路219号天府软件园C10栋11层",
          deliveryTime: "19:23",
          userSpare: "微辣"
        }
      ]
    };
  },
  methods: {
    handleClick() {},
    onSubmit() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style lang="less" scoped>
.order-list {
  background-color: #fff;
  padding-bottom: 20px;
}
</style>