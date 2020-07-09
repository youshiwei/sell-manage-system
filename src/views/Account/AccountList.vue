<template>
  <div class="account-list">
    <Title>账号列表</Title>
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="账号" width="120">
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column prop="group" label="用户组" width="120"></el-table-column>
        <el-table-column prop="time" label="创建时间" width="120"></el-table-column>
        <el-table-column label="操作" width="200">
          <el-button>编辑</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title.vue";
export default {
  components: {
    Title
  },
  data() {
    return {
      tableData: [
        {
          account: "李寻欢",
          group: "超级管理员",
          time: "2020/07/08"
        },
        {
          account: "李寻欢",
          group: "超级管理员",
          time: "2020/07/08"
        },
        {
          account: "李寻欢",
          group: "超级管理员",
          time: "2020/07/08"
        },
        {
          account: "李寻欢",
          group: "超级管理员",
          time: "2020/07/08"
        },
        {
          account: "李寻欢",
          group: "超级管理员",
          time: "2020/07/08"
        },
        {
          account: "李寻欢",
          group: "超级管理员",
          time: "2020/07/08"
        },
        {
          account: "李寻欢",
          group: "超级管理员",
          time: "2020/07/08"
        }
      ],
      multipleSelection: []
    };
  },

  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style lang="less" scoped>
.account-list {
  background-color: #fff;
  .content {
    padding: 20px;
  }
}
</style>