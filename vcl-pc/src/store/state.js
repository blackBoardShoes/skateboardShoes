import {appRouter, otherRouter, loginRouter, errorRouter} from '../router/router'
const state = {
  // 用户信息
  user: null,
  token: '',
  // 其它信息
  count: [],
  // 路由信息
  routers: [otherRouter, loginRouter, errorRouter, ...appRouter]
}

export default state
