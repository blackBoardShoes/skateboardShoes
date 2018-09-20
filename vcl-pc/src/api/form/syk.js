import axios from '../index'
const { all } = require('@/dev').proxyTableApi

// let config = {
//   headers: { 'Content-Type': 'multipart/form-data' }
// }
// termbase/getPageTermbases 获取术语列表
export const termbaseGetPageTermbases = data => {
  return axios.get(all + '/termbase/getPageTermbases', { params: data })
}
// termbase/addTermbaseImage 添加术语照片
export const termbaseAddTermbaseImage = data => {
  return axios.post(all + '/termbase/addTermbaseImage', data)
}
// termbase/addTermbaseImage 添加术语
// export const termbaseAddTermbase = data => {
//   return axios.post(all + '/termbase/addTermbase', data, config)
// }
export const termbaseAddTermbase = data => {
  return axios.post(all + '/termbase/addTermbase', data)
}
// termbase/removeTermbase 删除术语
export const termbaseRemoveTermbase = data => {
  return axios.delete(all + '/termbase/removeTermbase', { params: data })
}
// updateTermbase 更新接口
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

// export const termbaseSelectTermbase = data => {
//   return axios.get(all + '/termbase/selectTermbase', {
//     params: data
//   })
// }
