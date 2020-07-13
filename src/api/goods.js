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


