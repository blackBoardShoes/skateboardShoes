import axios from '../index'
const { api } = require('@/dev').proxyTableApi

// ==============================统计中心================================
// 教育水平
export const education = data => {
  return axios.get(api + `/formdata/getDataByEducation`, data)
}
// 职业
export const occupation = data => {
  return axios.get(api + `/formdata/getDataByOccupation`, data)
}
// 家庭年收入
export const familyIncome = data => {
  return axios.get(api + `/formdata/getDataByIncome`, data)
}
// 总住院费用
export const hospitalCost = data => {
  return axios.get(api + `/formdata/getDataByHospitalCost`, data)
}
// 住院年龄
export const hospitalAge = data => {
  return axios.get(api + `/formdata/getDataByAdmissionAge`, data)
}
// 总住院天数
export const hospitalDays = data => {
  return axios.get(api + `/formdata/getDataByTotalHosDays`, data)
}
// 术中并发症
export const operationBetween = data => {
  return axios.get(api + `/formdata/getDataByIntraoperativeComplications`, data)
}
// 术后表现及并发症
export const operationAfter = data => {
  return axios.get(api + `/formdata/getDataByPostManifestationsAndComplications`, data)
}
// 分型（本中心）
export const partingLocal = data => {
  return axios.get(api + `/formdata/getDataByPADtype`, data)
}
// 分型（国际分型）
export const partingNation = data => {
  return axios.get(api + `/formdata/getDataByPADintlType`, data)
}
