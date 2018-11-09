import axios from '../index'
const { api } = require('@/dev').proxyTableApi

let config = {
  headers: { 'Content-Type': 'multipart/form-data' }
}
// termbase/getPageTermbases 获取table数据 all 术语列表 无分页。
export const termbaseGetAllTermbases = data => {
  return axios.get(api + '/termbase/getAllTermbases')
}
// termbase/getPageTermbases 获取术语列表
export const termbaseGetPageTermbases = data => {
  return axios.get(api + '/termbase/getPageTermbases', { params: data })
}
// termbase/addTermbaseImage 添加术语
export const termbaseAddTermbase = data => {
  return axios.post(api + '/termbase/addTermbase', data, config)
}
// termbase/removeTermbase 删除术语
export const termbaseRemoveTermbase = data => {
  return axios.delete(api + '/termbase/removeTermbase', { params: {id: data.id} })
}
// updateTermbase 更新编辑术语
export const updateTermbase = data => {
  return axios.put(api + '/termbase/updateTermbase', data)
}
var CancelToken = axios.CancelToken
var cancel
// termbase/selectTermbase .根据术语id搜索术语
export const termbaseSelectTermbase = data => {
  if (typeof cancel === 'function') {
    cancel()
    cancel = null
  }
  return axios.get(api + '/termbase/selectTermbase', {
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    }),
    params: data
  })
}
// termbase/addTermbaseImage 添加术语照片
export const termbaseAddTermbaseImage = data => {
  return axios.post(api + '/termbase/addTermbaseImage', data)
}
// export const termbaseSelectTermbase = data => {
//   return axios.get(all + '/termbase/selectTermbase', {
//     params: data
//   })
// }
