import axios from '../index'
const {qiji} = require('@/dev').proxyTableApi

// 日期筛选
export const dateFilter = data => {
  return axios.get(qiji + `log/TimePageGetLogMessage?startTime=${data.startTime}&endTime=${data.endTime}&currentPage=${data.currentPage}&perPage=${data.pageSize}`)
}
// 搜索
export const getLog = data => {
  return axios.get(qiji + `/log/UserPageLogMessage?username=${data.username}&currentPage=${data.currentPage}&perPage=${data.pageSize}`)
}
// 导出日志
export const exportLog = data => {
  return axios.post(qiji + '/auth/logout ', data)
}
// 清空日志
export const clearLog = data => {
  return axios.delete(qiji + `/user`, data)
}
// 获取日志列表
// export const getAllLog = data => {
//   return axios.get(qiji + `/log/listGetLogMessage?perPage=${data.pageSize}&currentPage=${data.currentPage}`)
// }
