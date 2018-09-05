
import axios from '../index'
const {api, hot, dali} = require('@/dev').proxyTableApi
console.log(api, hot)
// 新增
export const record = data => {
  return axios.post(api + '/record', data)
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
export const patientGetPatientCount = data => {
  return axios.get(dali + '/patient/getPatientCount', { params: data })
}

export const patientAddPatient = data => {
  return axios.post(dali + '/patient/addPatient', data)
}
