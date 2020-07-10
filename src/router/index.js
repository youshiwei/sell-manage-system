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
    children: [
      {
        path: "/order/order-list",
        component: () => import("@/views/Order/OrderList.vue")
      },
      {
        path: "/order/order-edit",
        component: () => import("@/views/Order/OrderEdit.vue")
      }
    ]
  },
  // 商品管理
  {
    path: "/goods",
    component: Layout,
    children: [
      {
        path: "/goods/goods-list",
        component: () => import("@/views/Goods/GoodsList.vue")
      },
      {
        path: "/goods/goods-add",
        component: () => import("@/views/Goods/GoodsAdd.vue")
      },
      {
        path: "/goods/goods-cate",
        component: () => import("@/views/Goods/GoodsCate.vue")
      }
    ]
  },
  // 店铺管理
  {
    path: "/shop",
    component: Layout,
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
    component: Layout,
    children: [
      {
        path: "/account/account-add",
        component: () => import("@/views/Account/AccountAdd.vue")
      },
      {
        path: "/account/account-list",
        component: () => import("@/views/Account/AccountList.vue")
      },
      {
        path: "/account/pass-modify",
        component: () => import("@/views/Account/PassModify.vue")
      },
      {
        path: "/account/personal",
        component: () => import("@/views/Account/Personal.vue")
      }
    ]
  },
  // 销售统计
  {
    path: "/total",
    component: Layout,
    children: [
      {
        path: "/total/goods-total",
        component: () => import("@/views/Total/GoodsTotal.vue")
      },
      {
        path: "/total/order-total",
        component: () => import("@/views/Total/OrderTotal.vue")
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
