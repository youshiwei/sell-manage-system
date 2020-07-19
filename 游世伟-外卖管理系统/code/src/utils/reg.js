/**
 * 正则表达式
 * created by shiwei
 * 2020/07/10
 */

//  账号正则   3到12位（字母，数字，下划线，中文)
const Acc_Reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,12}$/

// 密码正则   3到12位（字母，数字，下划线，减号)
const Pwd_Reg = /^[a-zA-Z0-9_-]{3,12}$/

export { Acc_Reg, Pwd_Reg }
