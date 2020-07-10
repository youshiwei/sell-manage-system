<template>
  <Panel>
    <!-- 标题 -->
    <h1 slot="title">账户列表</h1>
    <!-- 内容 -->
    <div slot="content">
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
        <!-- 选择框 -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!-- 账号 -->
        <el-table-column label="账号" prop="account" width="180"></el-table-column>
        <!-- 用户组 -->
        <el-table-column label="用户组" prop="usergroup" width="180"></el-table-column>
        <!-- 创建时间 -->
        <el-table-column label="创建时间" prop="date" width="180"></el-table-column>
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
        style="margin-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 9, 13, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 批量删除和取消全选 -->
      <div style="margin-top:20px;">
        <el-button type="danger" size="small">批量删除</el-button>
        <el-button type="primary" size="small">取消全选</el-button>
      </div>
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
      currentPage: 1,
      pageSize: 5,
      total: 20,
      tableData: [
        { account: "小貂禅", usergroup: "超级管理员", date: "2020/07/10" },
        { account: "李寻欢", usergroup: "普通管理员", date: "2020/07/11" },
        { account: "小菲菲", usergroup: "普通管理员", date: "2020/07/12" },
        { account: "张无忌", usergroup: "超级管理员", date: "2020/07/15" }
      ]
    };
  },
  methods: {
    // 编辑
    handleEdit() {},
    // 删除
    handleDelete() {},

    handleSizeChange() {},

    handleCurrentChange() {}
  }
};
</script>

<style lang="less" scoped>
</style>