/**
 * 账户管理 ajax函数
 * created by youshiwei on July 11, 2020
 */
import req from "@/utils/request"

/* 登录请求 */
export function checkLogin(params) {
    return req.post("/users/checkLogin", params)
}
