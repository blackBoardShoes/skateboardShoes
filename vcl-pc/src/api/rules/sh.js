
import axios from '../index'
const {api} = require('@/dev').proxyTableApi
console.log(api)
// 通过
export const formdataPass = data => {
  console.log(data, 'datadatadata')
  return axios.post(`${api}/formdata/pass/${data['whatUser'].id}/${data['whatUser'].name}`, data)
}
// 驳回
export const formdataReject = data => {
  return axios.post(`${api}/formdata/reject`, data)
}
