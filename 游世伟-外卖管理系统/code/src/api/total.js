/**
 * 报表统计 ajax函数
 * created by youshiwei on Jul 15, 2020
 */

import req from "@/utils/request"
/* 首页报表接口 */
export function getTotalData() {
    return req.get("/order/totaldata")
}
/* 订单报表接口 */
export function getOrderData(params) {
    return req.get("/order/ordertotal", params)
}


