<template>
  <Panel class="goods-list">
    <!-- 标题 -->
    <h1 slot="title">商品列表</h1>
    <!-- 内容 -->
    <div slot="content">
      <!-- 商品查询表单 -->
      <el-form size="small" inline>
        <!-- 商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="searchForm.name"></el-input>
        </el-form-item>
        <!-- 商品分类 -->
        <el-form-item label="商品分类">
          <el-select v-model="searchForm.category">
            <el-option v-for="v in categories" :key="v" :value="v">{{ v }}</el-option>
          </el-select>
        </el-form-item>
        <!-- 查询按钮 -->
        <el-form-item>
          <el-button @click="handleSearch" type="primary">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 商品列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price}}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <span>
                  <img width="60" height="60" :src="imgBaseUrl+props.row.imgUrl" />
                </span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime | formatTime }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.sellCount }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.goodsDesc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- 商品名称 -->
        <el-table-column label="商品名称" prop="name"></el-table-column>

        <!-- 所属分类 -->
        <el-table-column label="所属分类" prop="category"></el-table-column>

        <!-- 商品价格 -->
        <el-table-column label="商品价格" prop="price"></el-table-column>

        <!-- 商品图片 -->
        <el-table-column label="商品图片" prop="imgUrl">
          <template slot-scope="scope">
            <img :src="imgBaseUrl+scope.row.imgUrl" width="40" height="40" alt />
          </template>
        </el-table-column>

        <!-- 商品描述 -->
        <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit( scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete( scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        style="margin-top:20px;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 20,50]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 编辑模态框 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
        <el-form style="width:80%">
          <!-- 商品名称 -->
          <el-form-item label="商品名称" label-width="80px" size="small">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <!-- 所属分类 -->
          <el-form-item label="所属分类" label-width="80px" size="small">
            <el-input v-model="editForm.category"></el-input>
          </el-form-item>
          <!-- 商品价格 -->
          <el-form-item label="商品价格" label-width="80px" size="small">
            <el-input v-model="editForm.price"></el-input>
          </el-form-item>
          <!-- 商品图片 -->
          <el-form-item label="商品图片" label-width="80px" size="small">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="imgBaseUrl+editForm.imgUrl"
                :src="imgBaseUrl+editForm.imgUrl"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <!-- 商品描述 -->
          <el-form-item label="商品描述" label-width="80px" size="small">
            <el-input type="textarea" autosize v-model="editForm.goodsDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleModify">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel/Panel.vue";
import { getGoodsList, delGoodsItem, modifyGoodsItem } from "@/api/goods";
import Moment from "moment";
import local from "@/utils/local";
export default {
  components: {
    Panel
  },
  data() {
    return {
      dialogVisible: false,
      imgBaseUrl: "http://127.0.0.1:5000/upload/imgs/goods_img/", // 图片所在服务的文件夹的位置【目录】
      currentPage: 1,
      pageSize: 5,
      total: 0,
      editForm: {},
      tableData: [],
      categories: [],
      searchForm: {
        name: "",
        category: ""
      }
    };
  },
  methods: {
    // 获取列表
    async fetchData() {
      let { data, total } = await getGoodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        name: this.searchForm.name,
        category: this.searchForm.category
      });
      // 处理价格  xx.xx
      data.forEach(v => {
        v.price = v.price.toFixed(2);
      });
      // 赋值渲染
      this.tableData = data;
      this.total = total;
    },
    // 编辑
    handleEdit(row) {
      this.dialogVisible = true;
      this.editForm = { ...row };
    },
    // 发送修改商品函数
    async handleModify() {
      let { code } = await modifyGoodsItem(this.editForm);
      if (code === 0) {
        this.fetchData();
      }
      this.dialogVisible = false;
    },
    // 删除
    handleDelete(row) {
      // 优化删除体验
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await delGoodsItem({ id: row.id });
          console.log(code);
          if (code === 0) {
            this.fetchData(); //重新渲染
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
      this.fetchData(); //改变每页条数调用一次
    },
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData(); //改变当前页调用一次
    },
    // 查询
    handleSearch() {
      this.currentPage = 1;
      this.fetchData();
    },
    // 重置
    handleReset() {
      this.searchForm = {
        name: "",
        category: ""
      };
      this.handleSearch();
    },
    // 图片上传设置
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 图片上传回调函数
    handleAvatarSuccess(res) {
      //上传图片响应数据
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg });
        this.editForm.imgUrl = imgUrl;
      }
    }
  },
  filters: {
    formatTime(time) {
      return Moment(time).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  created() {
    this.fetchData(); //进入页面调用一次
    this.categories = local.get("categories");
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  .demo-table-expand {
    font-size: 0;
  }
  /deep/.el-table_1_column_6 {
    .cell {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>