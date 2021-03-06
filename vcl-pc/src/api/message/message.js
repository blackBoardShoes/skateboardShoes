import axios from '../index'
const {api} = require('@/dev').proxyTableApi

// 顶部栏的部分未读消息
export const unreadMessage = data => {
  return axios.get(api + `/mail/topStatic?userId=${data}`)
}
export const unreadMessageUrl = data => {
  return api + `/mail/topStatic?userId=${data}`
}
// 顶部栏全部标记为已读
export const allRead = data => {
  return axios.put(api + `/mail/allReceiveMailInRead?userId=${data.userId}&type=${data.type}`)
}
// 顶部栏单个标记为已读
export const singleRead = data => {
  return axios.put(api + `/mail/updateMailInRead?mailId=${data}`)
}

// 发送消息
export const sendMessage = data => {
  return axios.post(api + `/mail/mailSendMail`, data)
}

// 消息列表
export const getPageMail = data => {
  return axios.get(api + `/mail/getPageReceiveMail?keyword=${data.keyword}&userId=${data.userId}&perPage=${data.perpage}&currentPage=${data.currentPage}&type=${data.type}`)
}

// 消息列表
export const removeSingleMail = data => {
  return axios.delete(api + `/mail/removeMail?mailId=${data.mailId}&keyword=${data.messageType}`)
}

// 清空全部消息:
export const clearAllMessage = data => {
  return axios.delete(api + `/mail/removeAllMail?keyword=${data.keyword}&userId=${data.userId}&type=${data.type}`)
}

// 搜索消息:
export const findMessage = data => {
  return axios.get(api + `/mail/advancedSelect?mode=${data.mode}&userId=${data.userId}&like=${data.like}&keyword=${data.keyword}&perPage=${data.perPage}&currentPage=${data.currentPage}&type=${data.type}`)
}
