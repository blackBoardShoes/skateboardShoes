import axios from '../index'
const { all } = require('@/dev').proxyTableApi

let config = {
  headers: { 'Content-Type': 'multipart/form-data' }
}
// termbase/getPageTermbases 获取table数据 all 术语列表 无分页。
export const termbaseGetAllTermbases = data => {
  return axios.get(all + '/termbase/getAllTermbases')
}
// termbase/getPageTermbases 获取术语列表
export const termbaseGetPageTermbases = data => {
  return axios.get(all + '/termbase/getPageTermbases', { params: data })
}
// termbase/addTermbaseImage 添加术语
export const termbaseAddTermbase = data => {
  return axios.post(all + '/termbase/addTermbase', data, config)
}
// termbase/removeTermbase 删除术语
export const termbaseRemoveTermbase = data => {
  return axios.delete(all + '/termbase/removeTermbase', { params: {id: data.id} })
}
// updateTermbase 更新编辑术语
export const updateTermbase = data => {
  return axios.put(all + '/termbase/updateTermbase', data)
}
var CancelToken = axios.CancelToken
var cancel
// termbase/selectTermbase .根据术语id搜索术语
export const termbaseSelectTermbase = data => {
  if (typeof cancel === 'function') {
    cancel()
    cancel = null
  }
  return axios.get(all + '/termbase/selectTermbase', {
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    }),
    params: data
  })
}
// termbase/addTermbaseImage 添加术语照片
export const termbaseAddTermbaseImage = data => {
  return axios.post(all + '/termbase/addTermbaseImage', data)
}
// export const termbaseSelectTermbase = data => {
//   return axios.get(all + '/termbase/selectTermbase', {
//     params: data
//   })
// }
