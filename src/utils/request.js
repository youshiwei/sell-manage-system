/**
 * axios工具函数
 * created by youshiwei on Jul 11, 2020
 * 
 */
// 引入axios和qs
import axios from "axios"
import qs from "qs"
// 引入local
import local from "@utils/local"

// 服务器地址
axios.defaults.baseUrl = "http://127.0.0.1:5000"
// 超时
axios.defaults.timeout = 5000


// 请求拦截
axios.interceptors.request.use(config => {
  // 去本地拿token
  let token = local.get("t_k") || "";
  if (token) {
    config.headers.Authorization = token //统一在请求头携带token
  }
})

// 响应拦截
axios.interceptors.response.use(response => response)

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
