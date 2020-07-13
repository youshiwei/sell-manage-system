<template>
  <Panel class="goods-cate">
    <!-- 标题 -->
    <h1 slot="title">
      <span>商品分类</span>
      <el-button @click="dialogVisible = true" size="mini" type="primary">添加分类</el-button>
    </h1>
    <!-- 内容 -->
    <div slot="content">
      <el-table ref="singleTable" :data="tableData" highlight-current-row style="width: 100%">
        <!-- 序号 -->
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <!-- 分类名称 -->
        <el-table-column prop="cateName" label="分类名称" width="300">
          <template slot-scope="scope">
            <!-- 文字，无法修改 -->
            <span v-if="!scope.row.isEdit">{{scope.row.cateName}}</span>
            <el-input v-else size="mini" v-model="scope.row.cateName" />
          </template>
        </el-table-column>
        <!-- 是否启用 -->
        <el-table-column label="是否启用" width="300">
          <template slot-scope="scope">
            <el-switch
              :disabled="scope.row.isEdit? false :true"
              v-model="scope.row.state"
              active-color="#13ce66"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :type="scope.row.isEdit? 'success':''"
              @click="handleEdit(scope.row)"
            >{{ scope.row.isEdit? "完成":"编辑" }}</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 添加分类模态框 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <el-form style="width:80%">
          <el-form-item label="分类名称" label-width="80px" size="small">
            <el-input v-model="addForm.cateName"></el-input>
          </el-form-item>
          <el-form-item label="是否启用" label-width="80px">
            <el-switch v-model="addForm.state" active-color="#13ce66"></el-switch>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddCate">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel/Panel.vue";
import { getGoodsCate, modifyCate, delCate, addCate } from "@/api/goods";
export default {
  components: {
    Panel
  },
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      tableData: [], //表格数据
      addForm: { cateName: "", state: false } //添加分类表单
    };
  },
  methods: {
    // 获取商品分类
    async fetchData() {
      let { data, total } = await getGoodsCate({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });
      data.forEach(v => {
        v.state = v.state === 1 ? true : false;
        v.isEdit = false; //每条数据添加一个是否可以编辑的状态
      });

      // 赋值渲染
      this.total = total;
      this.tableData = data;
    },
    // 当前页改变
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    // 编辑分类
    async handleEdit(row) {
      row.isEdit = !row.isEdit;
      if (row.isEdit === false) {
        let { code } = await modifyCate({
          id: row.id,
          cateName: row.cateName,
          state: row.state
        });
        if (code === 0) {
          this.fetchData();
        }
      }
    },
    // 删除分类
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await delCate({ id: row.id });
          if (code === 0) {
            this.fetchData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 添加分类
    async handleAddCate() {
      this.dialogVisible = false;
      // 发送添加商品分类请求
      let { code } = await addCate(this.addForm);
      if (code === 0) {
        this.fetchData();
      }
    }
  },
  created() {
    this.fetchData();
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