import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 解决重复跳转到自己警告让人难受的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

import Login from "@/views/Login.vue"
import Layout from "@/views/Layout/Layout.vue"

/**
 * 路由配置
 */

const routes = [
  // 登录
  {
    path: "/login",
    component: Login
  },
  // 后台界面大布局
  // 首页
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/Home.vue"),//路由懒加载
      }
    ]
  },
  // 订单管理
  {
    path: "/order",
    component: Layout,
    redirect: "/order/order-list",
    meta: { title: "订单管理" },
    children: [
      {
        path: "/order/order-list",
        meta: { title: "订单列表" },
        component: () => import("@/views/Order/OrderList.vue")
      },
      {
        path: "/order/order-edit",
        meta: { title: "订单编辑" },
        component: () => import("@/views/Order/OrderEdit.vue")
      }
    ]
  },
  // 商品管理
  {
    path: "/goods",
    component: Layout,
    redirect: "/goods/goods-list",
    meta: { title: "商品管理" },
    children: [
      {
        path: "/goods/goods-list",
        meta: { title: "商品列表" },
        component: () => import("@/views/Goods/GoodsList.vue")
      },
      {
        path: "/goods/goods-add",
        meta: { title: "商品添加" },
        component: () => import("@/views/Goods/GoodsAdd.vue")
      },
      {
        path: "/goods/goods-cate",
        meta: { title: "商品分类" },
        component: () => import("@/views/Goods/GoodsCate.vue")
      }
    ]
  },
  // 店铺管理
  {
    path: "/shop",
    component: Layout,
    meta: { title: "店铺管理" },
    children: [
      {
        path: "",
        component: () => import("@/views/Shop.vue")
      }
    ]
  },
  // 账户管理
  {
    path: "/account",
    meta: { title: "账户管理" },
    redirect: "/account/account-list",
    component: Layout,
    children: [
      {
        path: "/account/account-add",
        meta: { title: "添加账号" },
        component: () => import("@/views/Account/AccountAdd.vue")
      },
      {
        path: "/account/account-list",
        meta: { title: "账号列表" },
        component: () => import("@/views/Account/AccountList.vue")
      },
      {
        path: "/account/pass-modify",
        meta: { title: "修改密码" },
        component: () => import("@/views/Account/PassModify.vue")
      },
      {
        path: "/account/personal",
        meta: { title: "个人中心" },
        component: () => import("@/views/Account/Personal.vue")
      }
    ]
  },
  // 销售统计
  {
    path: "/total",
    component: Layout,
    redirect: "/total/goods-total",
    meta: { title: "销售统计" },
    children: [
      {
        path: "/total/goods-total",
        meta: { title: "商品统计" },
        component: () => import("@/views/Total/GoodsTotal.vue")
      },
      {
        path: "/total/order-total",
        meta: { title: "订单统计" },
        component: () => import("@/views/Total/OrderTotal.vue")
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
