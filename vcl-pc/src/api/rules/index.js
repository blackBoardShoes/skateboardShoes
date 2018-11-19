
import axios from '../index'
const {api} = require('@/dev').proxyTableApi
console.log(api)
// 新增
export const record = data => {
  return axios.post(api + '/formdata/record', data)
}
// 删除
export const formdataDelete = data => {
  return axios.delete(api + '/formdata/delete', { data: data })
}
// /record/followingup/{id} 删除
export const formdataDeleteId = data => {
  return axios.delete(`${api}/formdata/record/followingup/${data.id}`)
}
// 失访 /formdata/followingup/lostcontact/{id}
export const formdataFollowingupLostcontact = data => {
  return axios.post(`${api}/formdata/followingup/lostcontact/${data.id}`)
}
// TABLE
// 总表
export const recordAllRecord = data => {
  return axios.get(api + '/formdata/record/allRecord', { params: data })
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
// 待随访 /formdata/followUpFilledForm
export const formdataFollowUpFilledForm = data => {
  return axios.get(api + '/formdata/followUpFilledForm', { params: data })
}
// 获取患者信息
var CancelToken = axios.CancelToken
var cancel
export const patientGetPatientCount = data => {
  if (typeof cancel === 'function') {
    cancel()
    cancel = null
  }
  return axios.get(api + '/patient/getPatientCount', {
    cancelToken: new CancelToken(function executor (c) {
      cancel = c
    }),
    params: data
  })
}
// export const patientGetPatientCount = data => {
//   return axios.get(api + '/patient/getPatientCount', { params: data })
// }
// 添加患者信息
export const patientAddPatient = data => {
  return axios.post(api + '/patient/addPatient', data)
}
