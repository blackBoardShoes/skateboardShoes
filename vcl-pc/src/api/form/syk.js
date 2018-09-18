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
