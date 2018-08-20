import axios from '../index'
const {yt} = require('@/dev').proxyTableApi

// 登录
export const login = data => {
  return axios.post(yt + '/auth/login', data)
}
// 修改密码
export const changePassword = data => {
  return axios.post(yt + `/user/update_password?old_password=${data.oldPassword}&new_password=${data.newPassword}`)
}
// 退出登录
export const exit = data => {
  return axios.post(yt + '/auth/logout ', data)
}
// 获取所有用户信息
export const getAllUser = data => {
  return axios.get(yt + `/user/all?page=${data.currentPage}&page_size=${data.pageSize}`)
}
// 添加用户
export const addUser = data => {
  return axios.post(yt + `/user`, data)
}

// 禁用用户
export const forbiddenUser = data => {
  return axios.post(yt + `/user/freeze?user_id=${data}`)
}

// 重置用户
export const resetUser = data => {
  return axios.post(yt + `/user/reset_password?user_id=${data}`)
}
