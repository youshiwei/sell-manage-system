<template>
  <Panel class="goods-list">
    <!-- 标题 -->
    <h1 slot="title">商品列表</h1>
    <!-- 内容 -->
    <div slot="content">
      <!-- 商品列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品id">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="所属分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="商品价格">
                <span>{{ props.row.price }}</span>
              </el-form-item>
              <el-form-item label="商品图片">
                <span>
                  <img width="60" height="60" :src="props.row.imgUrl" />
                </span>
              </el-form-item>
              <el-form-item label="创建时间">
                <span>{{ props.row.ctime }}</span>
              </el-form-item>
              <el-form-item label="商品评价">
                <span>{{ props.row.comment }}</span>
              </el-form-item>
              <el-form-item label="商品销量">
                <span>{{ props.row.total }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
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
            <img :src="scope.row.imgUrl" width="40" height="40" alt />
          </template>
        </el-table-column>

        <!-- 商品描述 -->
        <el-table-column label="商品描述" prop="desc"></el-table-column>
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
        :page-sizes="[3, 5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
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
      currentPage: 1,
      pageSize: 3,
      total: 20,
      tableData: [
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          price: 18,
          imgUrl: require("@/assets/imgs/we.jpg"),
          ctime: "2020-07-12 12:34:05",
          total: 329,
          comment: 433
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          price: 18,
          imgUrl: require("@/assets/imgs/we.jpg"),
          ctime: "2020-07-12 12:34:05",
          total: 329,
          comment: 433
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          price: 18,
          imgUrl: require("@/assets/imgs/we.jpg"),
          ctime: "2020-07-12 12:34:05",
          total: 329,
          comment: 433
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          price: 18,
          imgUrl: require("@/assets/imgs/we.jpg"),
          ctime: "2020-07-12 12:34:05",
          total: 329,
          comment: 433
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          price: 18,
          imgUrl: require("@/assets/imgs/we.jpg"),
          ctime: "2020-07-12 12:34:05",
          total: 329,
          comment: 433
        },
        {
          id: "12987122",
          name: "好滋好味鸡蛋仔",
          category: "小吃零食",
          desc: "荷兰优质淡奶，奶香浓而不腻",
          price: 18,
          imgUrl: require("@/assets/imgs/we.jpg"),
          ctime: "2020-07-12 12:34:05",
          total: 329,
          comment: 433
        }
      ]
    };
  },
  methods: {
    handleEdit() {},
    handleDelete() {},
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style lang="less" scoped>
.goods-list {
  .demo-table-expand {
    font-size: 0;
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
}
</style>