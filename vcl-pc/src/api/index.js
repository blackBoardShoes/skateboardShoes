import axios from 'axios'
import router from '../router/index'
import store from '../store/index'
import { Message } from 'element-ui'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 120000
// 请求
axios.interceptors.request.use(
  config => {
    // 设置token
    if (store.user !== null) {
      config.headers.token = store.state.token
    } else {
      config.headers.token = null
    }
    if (!config['cancelToken']) {
      var CancelToken = axios.CancelToken
      config['cancelToken'] = new CancelToken(function executor (c) {
        store.commit('setCancelTokenData', c)
      })
    }
    return config
  },
  err => {
    Message.error({
      message: '请求失败'
    })
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    if (typeof response.data !== 'object') {
      return response
    }
    if (response.data) {
      if ('mitiStatus' in response.data) {
        if (response.data.mitiStatus.indexOf('ERROR') > -1) {
          if (response.data.message) {
            if (response.data.message === 'token无效' || response.data.message === '身份认证Token已失效') {
              router.push('/login')
            }
            Message({
              showClose: true,
              message: response.data.message,
              type: 'error'
            })
          } else {
            Message({
              showClose: true,
              message: 'SERVER_ERROR',
              type: 'error'
            })
          }
        } else if (response.data.mitiStatus === 'SUCCESS') {
          return response
        } else {
          Message({
            showClose: true,
            message: '服务器繁忙，请稍后再试。',
            type: 'info'
          })
        }
        return false
      }
    } else {
      router.push('/error:504')
    }
    return response
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 401:
          router.push('/login')
          Message({
            showClose: true,
            message: '请重新登陆'
          })
          break
        case 500:
          Message({
            showClose: true,
            message: '500'
          })
          router.push('/error:500')
          break
        case 404:
          Message({
            showClose: true,
            message: '404',
            type: 'error'
          })
          router.push('/error:404')
          break
        default:
          Message({
            showClose: true,
            message: '服务器开小差了',
            type: 'error'
          })
          router.push(`/error:${err.response.status}`)
          break
      }
    }
    return false
  }
)
export default axios
