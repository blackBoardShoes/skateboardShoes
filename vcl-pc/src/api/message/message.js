import axios from '../index'
const {dali} = require('@/dev').proxyTableApi

// 顶部栏的部分未读消息
export const unreadMessage = data => {
  return axios.get(dali + `/mail/topStatic?userId=${data}`)
}
// 顶部栏全部标记为已读
export const allRead = data => {
  return axios.put(dali + `/mail/allReceiveMailInRead?userId=${data.userId}&type=${data.type}`)
}
// 顶部栏单个标记为已读
export const singleRead = data => {
  return axios.put(dali + `/mail/updateMailInRead?mailId=${data}`)
}
