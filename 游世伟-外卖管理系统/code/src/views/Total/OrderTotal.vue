<template>
  <div class="order-total">
    <div class="date-scope">
      <!-- 查询表单 -->
      <el-form :inline="true" class="demo-form-inline">
        <!-- 时间范围 -->
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="date"
            value-format="yyyy-MM-dd HH:mm:ss"
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
    </div>
    <line-charts :options="options" />
  </div>
</template>

<script>
import { getOrderData } from "@/api/total";
import Moment from "moment";
import LineCharts from "@/components/Charts/LineCharts.vue";
export default {
  components: {
    LineCharts
  },
  data() {
    return {
      date: [],
      options: {
        title: "订单统计",
        legend: ["订单金额"],
        xAxis: [],
        series: []
      }
    };
  },
  methods: {
    search() {
      this.fetchData();
    },
    async fetchData() {
      let { data } = await getOrderData({
        date: JSON.stringify(this.date === null ? [] : this.date)
      });
      // 数据处理
      this.options.xAxis = data.map(v =>
        Moment(v.orderTime).format("YYYY-MM-DD HH:mm:ss")
      );
      this.options.series = [
        {
          name: "订单金额",
          type: "line",
          data: data.map(v => v.orderAmount)
        }
      ];
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="less" scoped>
.order-total {
  .date-scope {
    display: flex;
    align-items: center;
    span {
      margin-right: 20px;
    }
    .el-button {
      margin-left: 10px;
    }
  }
  .order-chart {
    margin-top: 20px;
    width: 100%;
    height: 500px;
    padding-right: 200px;
    box-sizing: border-box;
    background-color: #fff;
  }
}
</style>