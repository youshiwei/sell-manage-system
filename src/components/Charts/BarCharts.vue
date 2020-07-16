<template>
  <div ref="dataEcharts" class="total-data"></div>
</template>

<script>
export default {
  props: {
    options: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  methods: {
    getEchartsData(options) {
      var myChart = this.$echarts.init(this.$refs.dataEcharts);
      var option = {
        title: {
          text: options.title //1.options.title
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: options.legend //2.options.legend
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
          boundaryGap: true,
          data: options.xAxis
        },
        yAxis: {
          type: "value"
        },
        series: options.series
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    this.getEchartsData(this.options);
  },
  watch: {
    options: {
      handler(newVal, oldVal) {
        this.getEchartsData(newVal); // 如果数据变化了 重新使用新数据绘制报表
      },
      deep: true // 深度监听
    }
  }
};
</script>

<style lang="less" scoped>
.total-data {
  width: 100%;
  background-color: #fff;
  height: 500px;
}
</style>