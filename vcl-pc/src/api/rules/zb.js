
import axios from '../index'
const {api, hot} = require('@/dev').proxyTableApi
console.log(api, hot)
// all Data
export const recordData = data => {
  return axios.get(`${api}/formdata/record/${data}`)
}
