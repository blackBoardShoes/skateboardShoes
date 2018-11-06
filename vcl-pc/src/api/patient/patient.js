import axios from '../index'
const { dali, api } = require('@/dev').proxyTableApi
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
  return axios.get(dali + `/patient/getPatient?hospitalId=${data}`)
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
  return axios.get(api + `/recordsOrdered/patient/${data}`)
}

export const getPatientFollows = data => {
  return axios.get(api + `/followUpFilledForm/${data}`)
}

// 获取记录的字段模板等
export const getAllFormTemplates = data => {
  return axios.get(api + `/form/allForms`)
}

// 根据记录Id获取记录的详情
export const getRecordById = data => {
  return axios.get(api + `/record/${data}`)
}

// 性别统计
export const getDataByGender = data => {
  return axios.get(dali + `/patient/getPatientCountByGender`)
}

// 地区
export const getDataByArea = data => {
  return axios.get(dali + `/patient/getPatientCountByAddress`)
}
