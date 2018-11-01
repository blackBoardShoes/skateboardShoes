
import axios from '../index'
const {api, all} = require('@/dev').proxyTableApi
// 保存
export const formdataSave = data => {
  return axios.post(`${api}/formdata/save/${data['whatUser'].id}/${data['whatUser'].name}?t=${Date.now()}`, data)
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
// 获取所有能录入的人 id 和 name
export const userByMyType = data => {
  return axios.get(`${all}/user/userByMyType`, { params: data })
}
// formdata/getPeroperative/{id} 术前表
export const formdataGetPeroperative = data => {
  return axios.get(`${api}/formdata/getPeroperative/${data}`)
}
