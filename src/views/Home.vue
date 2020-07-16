<template>
  <div class="home">
    <div class="record">
      <Card class="card" v-for="item in CardData" :key="item.title" :CardItem="item"></Card>
    </div>
    <!-- 首页报表 -->
    <LineCharts :options="options" />
  </div>
</template>

<script>
import Card from "@/components/Card/Card.vue";
import LineCharts from "@/components/Charts/LineCharts/HomeLineCharts.vue";
import { getTotalData } from "@/api/total";
export default {
  components: {
    Card,
    LineCharts
  },
  data() {
    return {
      CardData: [
        {
          title: "总订单",
          value: 0,
          icon: "icon-zongdingdanfenshu",
          color: "blue"
        },
        {
          title: "总销售额",
          value: 0,
          icon: "icon-leijizongxiaoshoue",
          color: "purple"
        },
        {
          title: "今日订单",
          value: 0,
          icon: "icon-icon-1",
          color: "skyblue"
        },
        {
          title: "今日销售额",
          value: 0,
          icon: "icon-xiaoshoue-pressed",
          color: "green"
        }
      ],
      options: {},
      flag: false
    };
  },
  async created() {
    let {
      totalOrder,
      totalAmount,
      todayOrder,
      totayAmount,
      xData,
      orderData,
      amountData
    } = await getTotalData();
    // 渲染卡片
    let value = [totalOrder, totalAmount, todayOrder, totayAmount];
    value.forEach((v, i) => {
      this.CardData[i].value = v;
    });
    // 准备echarts数据,通过组件通信，传给子组件
    this.options = {
      title: "数据统计",
      legend: ["订单", "销售额"],
      xAxis: xData,
      series: [
        {
          name: "订单",
          type: "line",
          stack: "总量",
          data: orderData
        },
        {
          name: "销售额",
          type: "line",
          stack: "总量",
          data: amountData
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.home {
  .record {
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .card {
      width: calc(25% - 15px);
    }
  }
  // @media screen and (max-width: 1200px) {
  //   .total-data {
  //     width: 100%;
  //     background-color: #fff;
  //     height: 400px;
  //   }
  // }
}
</style>