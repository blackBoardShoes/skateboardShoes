import axios from '../index'
const { dali } = require('@/dev').proxyTableApi

// 获取项目列表(join/create)
export const getAllProject = data => {
  return axios.get(dali + `/ercpProject/getPageErcpProject?userId=${data.userId}&keyword=${data.projectType}&perPage=${data.perPage}&currentPage=${data.currentPage}&like=${data.searchText}`)
}

// 新增项目
export const addMProject = data => {
  return axios.post(dali + `/ercpProject/addErcpProject`, data)
}

// 获取单个项目的基本信息
export const getProjectInfo = data => {
  return axios.get(dali + `/ercpProject/getErcpProject?projectId=${data}`)
}

// 修改项目基本信息
export const modifyProject = data => {
  return axios.post(dali + `/patient/addPatient`, data)
}

// 锁定项目
export const lockProject = data => {
  return axios.put(dali + `/ercpProject/lockPro?projectId=${data}`)
}

// 删除项目
export const deleteProject = data => {
  return axios.put(dali + `/ercpProject/deletePro?projectId=${data}`)
}

// 获取成员列表
export const getMembers = data => {
  return axios.post(dali + `/patient/addPatient`, data)
}

// 添加成员至项目
export const addProjectMember = data => {
  return axios.post(dali + `/patient/addPatient`, data)
}

// 移除项目成员
export const removeProjectMember = data => {
  return axios.post(dali + `/patient/addPatient`, data)
}

// 项目成员分页
export const getProjectMembers = data => {
  return axios.post(dali + `/patient/addPatient`, data)
}
