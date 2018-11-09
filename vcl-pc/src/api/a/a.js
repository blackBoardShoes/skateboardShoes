import axios from '../index'
const {api} = require('@/dev').proxyTableApi

export const login = data => {
  return axios.post(api + '/login/verify', data)
}

export const fieldTest = data => {
  return axios.post(api + '/field', data)
}
export const fieldTests = data => {
  return axios.get(api + '/fields', data)
}
export const formTest = data => {
  return axios.post(api + '/form', data)
}
export const formTests = data => {
  return axios.get(api + '/forms', data)
}

export const hotMapData = data => {
  return axios.get(api + '/data/asset/data/hangzhou-tracks.json', data)
}
