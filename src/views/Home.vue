<template>
  <div class="home">
    <div class="record">
      <Card class="card" v-for="item in CardData" :key="item.title" :CardItem="item"></Card>
    </div>
    <div ref="dataEcharts" class="total-data"></div>
  </div>
</template>

<script>
import Card from "@/components/Card/Card.vue";
import { getTotalData } from "@/api/total";
export default {
  components: {
    Card
  },
  data() {
    return {
      xData: [],
      orderData: [],
      amountData: [],
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
      ]
    };
  },
  methods: {
    getEchartsData() {
      var myChart = this.$echarts.init(this.$refs.dataEcharts);
      var option = {
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单", "销售额", "注册人数", "管理人员"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2020/02/02",
            "2020/02/02",
            "2020/02/02",
            "2020/02/02",
            "2020/02/02",
            "2020/02/02",
            "2020/02/02"
          ]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "销售额",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "注册人数",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "管理人员",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          }
        ]
      };
      myChart.setOption(option);
    }
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
    let value = [totalOrder, totalAmount, todayOrder, totayAmount];
    value.forEach((v, i) => {
      this.CardData[i].value = v;
    });
  },
  mounted() {
    this.getEchartsData();
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
  .total-data {
    width: 100%;
    background-color: #fff;
    height: 400px;
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