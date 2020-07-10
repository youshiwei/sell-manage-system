<template>
  <Panel class="goods-cate">
    <!-- 标题 -->
    <h1 slot="title">
      <span>商品分类</span>
      <el-button size="small" type="primary">添加分类</el-button>
    </h1>
    <!-- 内容 -->
    <div slot="content">
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 100%"
      >
        <!-- 序号 -->
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <!-- 分类名称 -->
        <el-table-column prop="cate" label="分类名称" width="300"></el-table-column>
        <!-- 是否启用 -->
        <el-table-column label="是否启用" width="300">
          <el-switch v-model="value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-size="PageSize"
        layout="total, prev, pager, next, jumper"
        :total="20"
      ></el-pagination>
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
      PageSize: 5,
      value: true,
      tableData: [
        { cate: "热销榜" },
        { cate: "单人精彩套餐" },
        { cate: "冰爽饮品限时特惠" },
        { cate: "精选热菜" },
        { cate: "爽口凉菜" }
      ]
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style lang="less" scoped>
.goods-cate {
  h1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>