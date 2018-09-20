import {appRouter, loginRouter} from '../router/router'
const state = {
  // 用户信息
  user: null,
  token: '',
  // 其它信息
  count: [],
  // 路由信息
  routers: [loginRouter, ...appRouter],
  // 所有的动态字段,
  fieldAllFieldsData: [],
  cancelTokenData: null
}

export default state
