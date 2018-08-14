import axios from '../index'
const {api, hot} = require('@/dev').proxyTableApi
console.log(api, hot)

// 所有 form
export const fieldAllForms = data => {
  return axios.get(api + '/form/allForms', data)
}
