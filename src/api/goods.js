/**
 * 商品管理 ajax函数
 * created by youshiwei on Jul 13, 2020
 */

import req from "@/utils/request"

/* 获取产品分类 */
export function getGoodsCate(params) {
    return req.get("/goods/catelist", params)
}
/* 修改产品分类 */
export function modifyCate(params) {
    return req.post("/goods/editcate", params)
}

/* 删除产品分类 */
export function delCate(params) {
    return req.get("/goods/delcate", params)
}
/* 添加产品分类 */
export function addCate(params) {
    return req.post("/goods/addcate", params)
}
/* 查询商品分类 */
export function getGoodsCateName(params) {
    return req.get("/goods/categories", params)
}
/* 商品添加 */
export function addGoods(params) {
    return req.post("/goods/add", params)
}
/* 获取商品列表 */
export function getGoodsList(params) {
    return req.get("/goods/list", params)
}
/* 删除商品 */
export function delGoodsItem(params) {
    return req.get("/goods/del", params)
}
/* 修改商品 */
export function modifyGoodsItem(params) {
    return req.post("/goods/edit", params)
}



