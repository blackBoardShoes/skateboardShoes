
import axios from '../index'
const {api} = require('@/dev').proxyTableApi
console.log(api)
// 完成
export const formdataFollowupPass = data => {
  return axios.post(`${api}/formdata/followup/pass/${data['whatUser'].id}/${data['whatUser'].name}`, data)
}
