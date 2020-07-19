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
/* 批量删除 */
export function batchDelAccount(params) {
    return req.get("users/batchdel", params)
}
/* 检查旧密码 */
export function checkOldPwd(params) {
    return req.get("users/checkoldpwd", params)
}
/* 修改密码 */
export function modifyPwd(params) {
    return req.post("users/editpwd", params)
}
/* 获取用户信息 */
export function getPersonalInfo() {
    return req.get("users/info")
}
/* 获取用户信息 */
export function avatarEdit(params) {
    return req.get("users/avataredit", params)
}

