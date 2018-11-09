import axios from '../index'
const {api} = require('@/dev').proxyTableApi
console.log(api)

// 所有 form
export const fieldAllForms = data => {
  return axios.get(api + '/form/allForms', data)
}
// 新增 form
export const addFormPost = data => {
  return axios.post(api + '/form', data)
}
// 修改 form
export const editFormPut = data => {
  return axios.put(api + '/form', data)
}
// 删除
export const formDelete = data => {
  return axios.delete(api + '/form/' + data)
}
