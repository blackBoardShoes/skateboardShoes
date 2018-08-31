
import axios from '../index'
const {api, hot} = require('@/dev').proxyTableApi
console.log(api, hot)
export const formdataSave = data => {
  return axios.post(api + '/formdata/save', data)
}
