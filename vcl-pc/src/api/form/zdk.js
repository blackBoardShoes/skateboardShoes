import axios from '../index'
const {api, hot} = require('@/dev').proxyTableApi
console.log(api, hot)

// 所有字段
export const fieldAllFields = data => {
  return axios.get(api + '/field/allFields', data)
}
// 暂存
export const fieldTemporary = data => {
  return axios.post(api + '/field/temporary', data)
}
// 完成
export const fieldFinish = data => {
  return axios.post(api + '/field/finish', data)
}
// 修改
export const fieldUpdate = data => {
  return axios.put(api + '/field/update', data)
}
// 删除
export const fieldDelete = data => {
  return axios.delete(api + '/field/' + data)
}
