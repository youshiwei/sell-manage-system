/**
 * axios工具函数
 * created by youshiwei on Jul 11, 2020
 * 
 */
// 引入axios和qs
import axios from "axios"
import qs from "qs"
import { Message } from "element-ui"
import local from "@/utils/local"

axios.defaults.baseURL = "http://127.0.0.1:5000" // 服务器地址
axios.defaults.timeout = 5000 // 超时

// 请求拦截
axios.interceptors.request.use(config => {
  // 去本地拿token
  let token = local.get("t_k") || "";
  if (token) {
    config.headers.Authorization = token //统一在请求头携带token
  }
  return config
})

// 响应拦截
axios.interceptors.response.use(response => {
  // 如果有code和msg
  if (response.data.code !== undefined && response.data.msg !== undefined) {
    // 取出code 和 msg
    let { code, msg } = response.data
    if (code === 0) {
      // 成功
      Message({ type: "success", message: msg })
    } else if (code === 1) {
      Message.error(msg)
    }

  }
  return response
})

// 通用的get请求和post请求
export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  },
  post(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(params))
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    })
  }
}
