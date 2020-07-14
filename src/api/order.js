/**
 * 订单管理 ajax函数
 * created by youshiwei on Jul 14, 2020
 */
import req from "@/utils/request"

/* 获取订单列表 */
export function getOrderList(params) {
    return req.get("/order/list", params)
}
/* 获取订单详情 */
export function getOrderDetail(params) {
    return req.get("/order/detail", params)
}

