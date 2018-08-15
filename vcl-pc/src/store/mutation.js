import { sessionStorage } from '../assets/js/storage'
const mutations = {
  increment (state, payload) {
    // 变更状态
    state.count += payload.number
  },
  // 用户登录
  SET_USER (state, user) {
    sessionStorage.setItem('user', user)
    state.user = user
  },
  SET_TOKEN (state, token) {
    sessionStorage.setItem('token', token)
    state.token = token
  },
  GET_USER (state) {
    state.user = sessionStorage.getItem('user')
  },
  GET_TOKEN (state) {
    state.token = sessionStorage.getItem('token')
  }
}

export default mutations
