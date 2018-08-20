import axios from '../index'
const { dali } = require('@/dev').proxyTableApi

// 获取所有患者列表
export const getAllPatient = data => {
  return axios.get(dali + `/patient/getPagePatients?perPage=${data.pageSize}&currentPage=${data.currentPage}`)
}

// 添加用户
export const addPatient = data => {
  return axios.post(dali + `/patient/addPatient`, data)
}

// 添加用户
export const searchPatient = data => {
  return axios.get(dali + `/patient/vagueSelect?like=${data}&perPage=10&currentPage=1`)
}
