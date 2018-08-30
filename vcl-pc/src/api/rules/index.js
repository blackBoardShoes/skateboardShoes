
import axios from '../index'
const {api, hot} = require('@/dev').proxyTableApi
console.log(api, hot)
export const record = data => {
  return axios.post(api + '/record', data)
}

export const formdataUndoneFilledForm = data => {
  return axios.get(api + '/formdata/undoneFilledForm', { params: data })
}
