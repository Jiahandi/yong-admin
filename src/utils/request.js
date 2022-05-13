import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import ElementUI from 'element-ui'
// create an axios instance
const service = axios.create({
  // baseURL: 'http://localhost:9090', // url = base url + request url
  // 将URL改为服务器
  baseURL: 'http://106.12.17.164:9090', // url = base url + request url

  // withCredentials: true, // send cookies when cross-domain requests
  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 5000, // request timeout
  // 返回数据类型
  responseType: 'json'
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    const admin = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin')) : null
    if (admin) {
      config.headers['token'] = admin.token
    }

    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    let res = response.data
    // 如果是返回的文件
    if (response.config.responseType === 'blob') {
      return res
    }
    // 兼容服务端返回的字符串数据
    if (typeof res === 'string') {
      res = res ? JSON.parse(res) : res
    }
    if (res.code === '401') {
      ElementUI.Message({
        message: res.message,
        type: 'error'
      })
    }
    return res
  },
  error => {
    console.log('HTTP错误', error.response) // HTTP错误
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '账户登录过期，点击确定重新登录授权'
          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 405:
          error.message = '请求方法不被允许'
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
      }
    }
    if (error.response && error.response.status === 401) {
      store.dispatch('user/logout')
      return
    } else {
      let errorMsg = error.message
      if (errorMsg.includes('timeout')) {
        errorMsg = '网络超时'
      }
      if (errorMsg.includes('Network Error')) {
        errorMsg = '服务器开小差了'
      }
      Message({
        message: errorMsg,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
  }
)

export default service
