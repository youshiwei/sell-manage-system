<template>
  <div class="item">
    <span class="iconfont" :class="record.icon" :id="record.color"></span>
    <div>
      <h1>{{ record.title }}</h1>
      <p>{{ record.value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    record: {
      type: Object,
      require: true
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  box-sizing: border-box;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  width: 300px;
  height: 100px;
  span {
    font-size: 50px;
    &#blue {
      color: blue;
    }
    &#skyblue {
      color: skyblue;
    }
    &#green {
      color: green;
    }
    &#purple {
      color: purple;
    }
  }
  div {
    text-align: center;
    line-height: 30px;
    h1 {
      color: #aaa;
    }
  }
}
</style>