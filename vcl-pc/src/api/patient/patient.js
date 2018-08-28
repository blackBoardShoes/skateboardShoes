import axios from '../index'
const { dali } = require('@/dev').proxyTableApi
// 患者中心首页
// 获取所有患者列表
export const getAllPatient = data => {
  return axios.get(dali + `/patient/getPagePatients?perPage=${data.pageSize}&currentPage=${data.currentPage}`)
}

// 添加患者
export const addPatient = data => {
  return axios.post(dali + `/patient/addPatient`, data)
}

// 搜索患者
export const searchPatient = data => {
  return axios.get(dali + `/patient/vagueSelect?like=${data}&perPage=10&currentPage=1`)
}

// 患者详情页:
// 根据患者id获取患者的基本信息
export const getPatientBasic = data => {
  return axios.get(dali + `/patient/getPatient?patientId=${data}`)
}
// 删除患者
export const deletePatient = data => {
  return axios.delete(dali + `/patient/deletePatient?patientId=${data}`)
}
// 修改患者基本信息
export const editPatientBasic = data => {
  return axios.put(dali + `/patient/updatePatient`, data)
}

// 患者记录部分:
// 获取患者的所有记录
export const getPatientRecords = data => {
  return axios.get(dali + `/patient/vagueSelect?like=${data}&perPage=10&currentPage=1`)
}
