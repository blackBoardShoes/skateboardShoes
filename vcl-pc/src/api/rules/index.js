
import axios from '../index'
const {api, hot, dali} = require('@/dev').proxyTableApi
console.log(api, hot)
// 新增
export const record = data => {
  return axios.post(api + '/record', data)
}
// 删除
export const formdataDelete = data => {
  return axios.delete(api + '/formdata/delete', { data: data })
}
// TABLE
// 总表
export const recordAllRecord = data => {
  return axios.get(api + '/record/allRecord', { params: data })
}
// 待录入
export const formdataUndoneFilledForm = data => {
  return axios.get(api + '/formdata/undoneFilledForm', { params: data })
}
// 审核
export const formdataFinishedFilledForm = data => {
  return axios.get(api + '/formdata/finishedFilledForm', { params: data })
}
// 待修正 rejectedFilledForm
export const formdataRejectedFilledForm = data => {
  return axios.get(api + '/formdata/rejectedFilledForm', { params: data })
}
// 获取患者信息
export const patientGetPatientCount = data => {
  return axios.get(dali + '/patient/getPatientCount', { params: data })
}
// 添加患者信息
export const patientAddPatient = data => {
  return axios.post(dali + '/patient/addPatient', data)
}
