import axios from '../index'
const {dali} = require('@/dev').proxyTableApi

// 日期筛选
export const dateFilter = data => {
  return axios.post(dali + '/auth/login', data)
}
// 搜索
export const search = data => {
  return axios.post(dali + `/user/update_password?old_password=${data.oldPassword}&new_password=${data.newPassword}`)
}
// 导出日志
export const exportLog = data => {
  return axios.post(dali + '/auth/logout ', data)
}
// 清空日志
export const clearLog = data => {
  return axios.post(dali + `/user`, data)
}
// 获取日志列表
export const getAllLog = data => {
  return axios.get(dali + `/user/all?page=${data.currentPage}&page_size=${data.pageSize}`)
}
