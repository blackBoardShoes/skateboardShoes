
import axios from '../index'
const {api, hot} = require('@/dev').proxyTableApi
console.log(api, hot)
// 保存
export const formdataSave = data => {
  return axios.post(`${api}/formdata/save`, data)
}
// 提交
export const formdataSubmit = data => {
  console.log('formdataSubmitformdataSubmit')
  return axios.post(`${api}/formdata/submit?t=${Date.now()}`, data)
}
// 通过id 返回表单数据
export const formdataData = data => {
  return axios.get(`${api}/formdata/${data}`)
}
