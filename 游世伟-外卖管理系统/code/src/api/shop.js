/**
 * 店铺管理 ajax函数
 * created by youshiwei on Jul 15, 2020
 */
import req from "@/utils/request"
/* 获取店铺信息 */
export function getShopInfo() {
    return req.get("/shop/info")
}
/* 修改店铺请求 */
export function modifyShopInfo(params) {
    return req.post("/shop/edit", params)
}
