
import axios from '../index'
const {api} = require('@/dev').proxyTableApi
console.log(api)
// all Data
export const recordData = data => {
  return axios.get(`${api}/formdata/record/${data}`)
}
