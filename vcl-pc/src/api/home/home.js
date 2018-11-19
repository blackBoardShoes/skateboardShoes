import axios from '../index'
const { api } = require('@/dev').proxyTableApi
// 首页统计(数量统计)
// 患者总人数  222
export const patientNumber = data => {
  return axios.get(api + `/patient/getAllPatientCount`)
}
// 住院人次 222
export const inHospitalNumber = data => {
  return axios.get(api + `/formdata/inHospitalCount`)
}
// // 用户数量
// export const userNumber = data => {
//   return axios.get(api + `formdata/getOperCompCount?type=${data}`)
// }
// 待手术 222
export const needOperation = data => {
  return axios.get(api + `/formdata/wairForOperaiton`)
}
//  (本用户) 待审核   222
export const nonCheckNumber = data => {
  return axios.get(api + `/formdata/getToCheckCount`)
}
//  (本用户) 待修正  222
export const nonRepairNumber = data => {
  return axios.get(api + `/formdata/getToAmend`)
}
// 首页统计(图表统计)
// 手术完成统计  222
export const operationFinishedByMonth = data => {
  return axios.get(api + `/formdata/getOperCompCountByMonth`)
}
export const operationFinishedByWeek = data => {
  return axios.get(api + `/formdata/getOperCompCountByWeek`)
}
export const operationFinishedByDay = data => {
  return axios.get(api + `/formdata/getOperCompCountByDay`)
}
// 各科室患者分布  222
export const aoPatient = data => {
  return axios.get(api + `/formdata/getDeptPatientCount`)
}
// 患者出院时状态分布  222
export const outHospitalStatus = data => {
  return axios.get(api + `/formdata/getLeaveHospitalStatus`)
}
// // 工作量统计
// export const workload = data => {
//   return axios.get(api + `formdata/getOperCompCount?type=${data}`)
// }
// // 手术时长分布
// export const operationDuration = data => {
//   return axios.get(api + `formdata/getOperCompCount?type=${data}`)
// }
// 手术难度分布  222
export const operationDiff = data => {
  return axios.get(api + `/formdata/getAsgeCount`)
}
