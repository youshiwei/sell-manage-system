/**
 * 账户管理 ajax函数
 * created by youshiwei on July 11, 2020
 */
import req from "@/utils/request"

/* 登录请求 */
export function checkLogin(params) {
    return req.post("/users/checkLogin", params)
}
/* 添加账号 */
export function addAccount(params) {
    return req.post("/users/add", params)
}
/*  获取账号列表 */
export function getAccountList(params) {
    return req.get("users/list", params)
}
/*  删除账号 */
export function delAccount(params) {
    return req.get("users/del", params)
}
/* 编辑保存 */
export function editAccount(params) {
    return req.post("users/edit", params)
}
