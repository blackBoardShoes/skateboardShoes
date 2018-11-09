import axios from '../index'
const {api} = require('@/dev').proxyTableApi

// 日期筛选
export const dateFilter = data => {
  return axios.get(api + `log/TimePageGetLogMessage?startTime=${data.startTime}&endTime=${data.endTime}&currentPage=${data.currentPage}&perPage=${data.pageSize}`)
}
// 搜索
export const getLog = data => {
  return axios.get(api + `/log/UserPageLogMessage?username=${data.username}&type=${data.type}&startTime=${data.startTime}&endTime=${data.endTime}&currentPage=${data.currentPage}&perPage=${data.pageSize}`)
}
// 导出日志
export const exportLog = data => {
  return axios.post(api + '/auth/logout ', data)
}
// 清空日志
export const clearLog = data => {
  return axios.delete(api + `/user`, data)
}
// 获取日志列表
// export const getAllLog = data => {
//   return axios.get(qiji + `/log/listGetLogMessage?perPage=${data.pageSize}&currentPage=${data.currentPage}`)
// }
