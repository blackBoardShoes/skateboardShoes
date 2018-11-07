import axios from 'axios'
import router from '../router/index'
// import Qs from 'qs'
// import {apiUrl} from '../dev'
// axios.defaults.baseURL = '/api'
import store from '../store/index'
import { Message } from 'element-ui'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// var loadingInstance
axios.defaults.timeout = 120000
axios.interceptors.request.use(
  config => {
    // loadingInstance = Loading.service({
    //   fullscreen: true,
    //   lock: true,
    //   text: '正在请求数据...'
    // })
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
    console.log(err)
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    // loadingInstance.close()
    if (typeof response.data !== 'object') {
      return response
    }
    if (response.data) {
      if ('mitiStatus' in response.data) {
        console.log(response.data)
        if (response.data.mitiStatus.indexOf('ERROR') > -1) {
          if (response.data.message) {
            if (response.data.message === 'token无效' || response.data.message === '身份认证Token已失效') {
              router.push('/login')
            }
            Message({
              showClose: true,
              message: response.data.message,
              type: 'info'
            })
          } else {
            Message({
              showClose: true,
              message: 'SERVER_ERROR',
              type: 'error'
            })
          }
        } else if (response.data.mitiStatus === 'SUCCESS') {
          if (response.data.message) {
            Message({
              showClose: true,
              message: response.data.message,
              type: 'success'
            })
          }
          return response
        } else {
          Message({
            showClose: true,
            message: '服务器有点忙。',
            type: 'info'
          })
        }
        return false
      }
    } else {
      router.push('/error:504')
    }
  },
  err => {
    // loadingInstance.close()
    if (err.response) {
      switch (err.response.status) {
        case 401:
          router.push('/login')
          break
        case 500:
          console.log('oh shit md fuck 又 500 了')
          router.push('/error:500')
          break
        case 404:
          console.log('啥玩意又找不到了')
          router.push('/error:404')
          break
        default:
          console.log('这个错 --->', err.response.status, '!!!!!!!!!!', err.response.status, '!!!!!!!!!!')
          break
      }
      Message({
        showClose: true,
        message: '服务器没开？',
        type: 'error'
      })
    }
    return false
  }
)
export default axios
