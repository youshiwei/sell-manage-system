<template>
  <div class="order-list">
    <!-- 查询表单 -->
    <el-form size="small" style="padding:20px;" inline :model="searchForm" class="demo-form-inline">
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
          value-format="yyyy-MM-dd HH:mm:ss"
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
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
      <!-- 重置按钮 -->
      <el-form-item>
        <el-button @click="handleReset">重置</el-button>
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
          <el-button @click="handleDetail(scope.row.id)" type="text" size="small">查看</el-button>
          <el-button @click="handleEdit(scope.row.id)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top:20px;padding-left:20px;"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 查看订单详情模态框 -->
    <el-dialog title="订单详情" :visible.sync="dialogVisible" width="60%">
      <el-form disabled inline label-width="120px">
        <!-- 订单id -->
        <el-form-item label="订单ID">
          <el-input v-model="currentOrderDetail.id"></el-input>
        </el-form-item>
        <!-- 订单号 -->
        <el-form-item label="订单号">
          <el-input v-model="currentOrderDetail.orderNo"></el-input>
        </el-form-item>
        <!-- 下单时间 -->
        <el-form-item label="下单时间">
          <el-input v-model="currentOrderDetail.orderTime"></el-input>
        </el-form-item>
        <!-- 联系电话 -->
        <el-form-item label="联系电话">
          <el-input v-model="currentOrderDetail.phone"></el-input>
        </el-form-item>
        <!-- 收货人 -->
        <el-form-item label="收货人">
          <el-input v-model="currentOrderDetail.consignee"></el-input>
        </el-form-item>
        <!-- 送货地址 -->
        <el-form-item label="送货地址">
          <el-input v-model="currentOrderDetail.deliverAddress"></el-input>
        </el-form-item>
        <!-- 送达时间 -->
        <el-form-item label="送达时间">
          <el-input v-model="currentOrderDetail.deliveryTime"></el-input>
        </el-form-item>
        <!-- 备注 -->
        <el-form-item label="备注">
          <el-input v-model="currentOrderDetail.remarks"></el-input>
        </el-form-item>
        <!-- 订单金额 -->
        <el-form-item label="订单金额">
          <el-input v-model="currentOrderDetail.orderAmount"></el-input>
        </el-form-item>
        <!-- 订单状态 -->
        <el-form-item label="订单状态">
          <el-input v-model="currentOrderDetail.orderState"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderList, getOrderDetail } from "@/api/order";
import Moment from "moment";
import local from "@/utils/local";
export default {
  data() {
    return {
      total: 0,
      dialogVisible: false,
      currentPage: 1,
      pageSize: 5,
      searchForm: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      },
      tableData: [],
      currentOrderDetail: {}
    };
  },
  methods: {
    // 获取数据列表
    async fetchData() {
      if (!this.searchForm.date) this.searchForm.date = [];
      let { data, total } = await getOrderList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.searchForm.orderNo,
        consignee: this.searchForm.consignee,
        phone: this.searchForm.phone,
        orderState: this.searchForm.orderState,
        date: JSON.stringify(this.searchForm.date)
      });
      // 处理下单时间，送达时间
      data.forEach(v => {
        v.orderTime = Moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss");
        v.deliveryTime = Moment(v.deliveryTime).format("YYYY-MM-DD HH:mm:ss");
      });
      this.tableData = data;
      this.total = total;
    },
    // 订单详情
    async handleDetail(id) {
      this.dialogVisible = true;
      let { data } = await getOrderDetail({ id });
      data.orderTime = Moment(data.orderTime).format("YYYY-MM-DD HH:mm:ss");
      data.deliveryTime = Moment(data.deliveryTime).format(
        "YYYY-MM-DD HH:mm:ss"
      );
      this.currentOrderDetail = data;
    },
    // 订单编辑
    async handleEdit(id) {
      let { data } = await getOrderDetail({ id });
      local.set("orderData", data);
      this.$router.push("/order/order-edit");
    },
    // 查询
    handleSearch() {
      this.currentPage = 1;
      this.fetchData();
    },
    // 重置
    handleReset() {
      this.searchForm = {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        date: []
      };
      // 重置筛选条件，再查询一次
      this.handleSearch();
    },
    // 改变当前页，刷新数据
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
  border-radius: 4px;
  box-shadow: 0px 0px 3px #ccc;
  background-color: #fff;
  padding-bottom: 20px;
}
</style>