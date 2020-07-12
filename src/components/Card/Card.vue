<template>
  <div class="item">
    <span class="iconfont" :class="CardItem.icon" :id="CardItem.color"></span>
    <div>
      <h1>{{ CardItem.title }}</h1>
      <p>{{ CardItem.value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    CardItem: {
      type: Object,
      require: true
    }
  }
};
</script>

<style lang="less" scoped>
.item {
  border-radius: 3px;
  box-shadow: 0px 0px 5px #ccc;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #fff;
  height: 100px;
  span {
    flex: 0 0 50%;
    display: flex;
    justify-content: center;
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
    flex: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    line-height: 30px;
    h1 {
      color: #aaa;
    }
  }
}

@media screen and(max-width:1000px) {
  .item {
    border-radius: 3px;
    box-shadow: 0px 0px 5px #ccc;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    height: 100px;
    span {
      flex: 0 0 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
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
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      text-align: center;
      line-height: 25px;
      h1 {
        color: #aaa;
      }
    }
  }
}
</style>