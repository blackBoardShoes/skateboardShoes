import axios from '../index'
const { api } = require('@/dev').proxyTableApi
// 首页统计(数量统计)
// 患者总人数
export const patientNumber = data => {
  return axios.get(api + `formdata/getOperCompCount?type=${data}`)
}
// 住院人次
export const inHospitalNumber = data => {
  return axios.get(api + `formdata/getOperCompCount?type=${data}`)
}
// 用户数量
export const userNumber = data => {
  return axios.get(api + `formdata/getOperCompCount?type=${data}`)
}
// （本用户）今日审核
export const checkedNumber = data => {
  return axios.get(api + `formdata/getOperCompCount?type=${data}`)
}
//  (本用户) 待审核
export const nonCheckNumber = data => {
  return axios.get(api + `formdata/getOperCompCount?type=${data}`)
}
//  (本用户) 待修正
export const nonRepairNumber = data => {
  return axios.get(api + `formdata/getOperCompCount?type=${data}`)
}
// 首页统计(图表统计)
// 手术完成统计
export const operationFinished = data => {
  return axios.get(api + `formdata/getOperCompCount?type=${data}`)
}
// 各科室患者分布
export const aoPatient = data => {
  return axios.get(api + `formdata/getOperCompCount?type=${data}`)
}
// 患者出院时状态分布
export const outHospitalStatus = data => {
  return axios.get(api + `formdata/getOperCompCount?type=${data}`)
}
// 工作量统计
export const workload = data => {
  return axios.get(api + `formdata/getOperCompCount?type=${data}`)
}
// 手术时长分布
export const operationDuration = data => {
  return axios.get(api + `formdata/getOperCompCount?type=${data}`)
}
// 手术难度分布
