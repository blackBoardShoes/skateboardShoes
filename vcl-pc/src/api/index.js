import axios from 'axios'
// import Qs from 'qs'
// import {apiUrl} from '../dev'
// axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 3000

axios.interceptors.request.use(
  config => {
    // if (config.method === 'post') {
    //   config.data = Qs.stringify(config.data)
    // }
    return config
  },
  err => {
    console.log(err)
    return Promise.reject(err)
  }
)
axios.interceptors.response.use(
  response => {
    if ('mitiStatus' in response.data) {
      if (response.data.mitiStatus === 'SERVER_ERROR') {
        return false
      } else {
        return response
      }
    }
  },
  err => {
    if (err.response) {
      switch (err.response.status) {
        case 500:
          console.log('oh shit md fuck 又 500 了')
          this.$router.push('/error/500')
          break
        case 404:
          console.log('啥玩意又找不到了')
          this.$router.push('/error/404')
          break
        default:
          console.log('这个错 --->', err.response.status, '!!!!!!!!!!', err.response.status, '!!!!!!!!!!')
          break
      }
    }
    return false
  }
)
export default axios
