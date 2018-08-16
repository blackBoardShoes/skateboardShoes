import axios from '../index'
// import Qs from 'qs'
const {yt} = require('@/dev').proxyTableApi
// console.log(yt, hot)

export const login = data => {
  return axios.post(yt + '/auth/login', data)
}

export const changePassword = data => {
  return axios.post(yt + `/user/update_password?old_password=${data.oldPassword}&new_password=${data.newPassword}`)
}

export const exit = data => {
  return axios.post(yt + '/auth/logout ', data)
}
