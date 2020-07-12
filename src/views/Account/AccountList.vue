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
        <el-table-column label="用户组" prop="userGroup" width="180"></el-table-column>
        <!-- 创建时间 -->
        <el-table-column label="创建时间" prop="ctime" width="180"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>

      <!-- 批量删除和取消全选 -->
      <div style="margin-top:20px;">
        <el-button type="danger" size="small">批量删除</el-button>
        <el-button type="primary" size="small">取消全选</el-button>
      </div>
      <!-- 编辑模态框 -->
      <el-dialog title="账号编辑" :visible.sync="dialogVisible" width="30%">
        <el-form :model="editForm" label-width="77px" style="width:300px">
          <el-form-item label="账号">
            <el-input v-model="editForm.account"></el-input>
          </el-form-item>
          <el-form-item label="用户组">
            <el-select v-model="editForm.userGroup">
              <el-option value="超级管理员">超级管理员</el-option>
              <el-option value="普通管理员">普通管理员</el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel/Panel.vue";
import Moment from "moment";
import { getAccountList, delAccount, editAccount } from "@/api/account";
export default {
  components: {
    Panel
  },
  data() {
    return {
      dialogVisible: false,
      currentPage: 1, //当前页
      pageSize: 3, //每页条数
      total: 0, //总条数
      editForm: {},
      tableData: [
        { account: "小貂禅", userGroup: "超级管理员", ctime: "2020/07/10" },
        { account: "李寻欢", userGroup: "普通管理员", ctime: "2020/07/11" },
        { account: "小菲菲", userGroup: "普通管理员", ctime: "2020/07/12" },
        { account: "张无忌", userGroup: "超级管理员", ctime: "2020/07/15" }
      ]
    };
  },
  methods: {
    // 获取列表数据
    async getData() {
      let { total, data } = await getAccountList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      // 处理时间格式
      data.forEach(v => {
        v.ctime = Moment(v.ctime).format("YYY-MM-DD HH:mm:ss");
      });
      // 删除边界判断，如果当前页无数据，且当前页不是第一页，currentPage--
      if (!data.length && this.currentPage !== 1) {
        this.currentPage--;
        this.getData();
      }
      // 赋值渲染
      this.total = total;
      this.tableData = data;
    },
    // 点击编辑 显示模态框 数据回填到editForm
    handleEdit(row) {
      this.dialogVisible = true;
      this.editForm = { ...row };
    },
    // 保存编辑
    async saveEdit() {
      this.dialogVisible = false;
      let { code } = await editAccount({
        id: this.editForm.id,
        account: this.editForm.account,
        userGroup: this.editForm.userGroup
      });
      if (code === 0) {
        // 修改成功
        this.getData();
      }
    },
    // 删除
    handleDelete(id) {
      // 优化删除体验
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await delAccount({ id });
          if (code === 0) {
            this.getData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    handleSizeChange(size) {
      this.pageSize = size;
      this.getData();
    },

    handleCurrentChange(current) {
      this.currentPage = current;
      this.getData();
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
</style>