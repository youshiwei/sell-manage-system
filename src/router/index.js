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
import local from "@/utils/local"


/**
 * 路由配置【默认只配置两个】
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

]

/**
 * 动态路由
 */
const dynamicRoutes = [
  // 登录
  {
    path: "/login",
    component: Login,
    visible: false
  },
  // 后台界面大布局
  // 首页
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    meta: { title: "后台首页", icon: "el-icon-s-home" },

    visible: true,
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
    visible: true,
    component: Layout,
    redirect: "/order/order-list",
    meta: { title: "订单管理", icon: "el-icon-s-order" },
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
    visible: true,
    redirect: "/goods/goods-list",
    meta: { title: "商品管理", icon: "el-icon-shopping-bag-1" },
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
    visible: true,
    component: Layout,
    meta: { title: "店铺管理", icon: "el-icon-s-shop" },
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
    meta: { title: "账户管理", icon: "el-icon-user-solid", role: ["super", "normal"] },
    redirect: "/account/account-list",
    component: Layout,
    visible: true,
    children: [
      {
        path: "/account/account-add",
        meta: { title: "添加账号", role: ["super"] },
        component: () => import("@/views/Account/AccountAdd.vue")
      },
      {
        path: "/account/account-list",
        meta: { title: "账号列表", role: ["super"] },
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
    visible: true,
    redirect: "/total/goods-total",
    meta: { title: "销售统计", icon: "el-icon-pie-chart", role: ["super"] },
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
  },
  // not found 404
  {
    path: "/404",
    visible: false,
    component: () => import("@/views/404.vue")
  },
  {
    path: "*",
    redirect: "/404",
    visible: false,
  }

]

const router = new VueRouter({
  routes
})

/* 路由守卫 */
router.beforeEach((to, from, next) => {
  /* 
    to:你要去哪儿 【你要去的目标路由对象】
    from:你从哪儿来 【你离开的路由对象】
    next:走吧，放行 【函数】
   */
  // 判断是否登录
  let isLogin = local.get("t_k") ? true : false
  if (isLogin) {
    next(); //如果已经登录，直接放行
  } else {
    if (to.path === "/login") {
      next();//放行
    } else {
      next({ path: "/login" })//没有登录，去任何页面都会重置到登录页
    }
  }
})


/**
 * @description:判断当前路由对象 是否有权限
 * @param {router} 当前路由对象
 * @param {role} 当前用户角色
 * returns:true 有权限 false 没有权限
 */
function hasPermission(router, role) {
  // 如果路由中有meta且meta中有role证明配置了权限
  if (router.meta && router.meta.role) {
    return router.meta.role.includes(role)
  } else {
    // 否则就是没有配 [没有配置的 默认都有权限]
    return true
  }
}

/**
 * @description:判断在不在左侧显示
 * @param {accessRoutes} 当前路由对象
 * @param {role} 当前角色
 */
function isVisible(router, role) {
  if (router.visible) {
    return true
  } else {
    return false
  }
}

/**
 * @description:计算菜单
 * @param {accessRoutes} 当前有权限访问的路由 
 * @param {role} 当前角色 
 */
function calcMenus(accessRoutes, role) {
  let arr = accessRoutes.filter(router => {
    if (isVisible(router, role)) {
      return true
    } else {
      return false
    }
  })
  return arr
}

/**
 * @description:计算出当前角色有权限访问的路由
 * @param {dynamicRoutes} 当前所有动态路由
 * @param {role} 当前用户角色
 * @returns:数组 当前可以访问的路由数组
 */
function calcRoutes(dynamicRoutes, role) {
  let arr = dynamicRoutes.filter((router) => {
    if (hasPermission(router, role)) {
      if (router.children && router.children.length) {
        router.children = calcRoutes(router.children, role)
      }
      return true
    } else {
      return false
    }
  })
  return arr
}

/**
 * 根据当前角色，动态创建出当前角色可访问的路由
 */
export function createRoutes() {
  let role = local.get("role")
  // 计算出有权限访问的路由
  let accessRoutes = calcRoutes(dynamicRoutes, role)
  // 动态添加路由
  router.addRoutes(accessRoutes)

  // 计算动态菜单
  let menus = calcMenus(accessRoutes, role)

  // 存入本地
  local.set("menus", menus)
}
createRoutes()
export default router
