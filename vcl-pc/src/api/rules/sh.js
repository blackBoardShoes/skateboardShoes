
import axios from '../index'
const {api, hot} = require('@/dev').proxyTableApi
console.log(api, hot)
// 通过
export const formdataPass = data => {
  return axios.post(`${api}/formdata/pass`, data)
}
// 驳回
export const formdataReject = data => {
  return axios.post(`${api}/formdata/reject`, data)
}
