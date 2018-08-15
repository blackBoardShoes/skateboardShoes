import Vue from 'vue'
import VueRouter from 'vue-router'
import { routers } from './router'
import { Loading } from 'element-ui'
import sessionStorage from '../../src/assets/js/storage/sessionStorage'
Vue.use(VueRouter)
const routerConfig = {
  mode: 'hash',
  linkActiveClass: 'active',
  routes: routers,
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
}

const router = new VueRouter(routerConfig)

let loading
router.beforeEach((to, form, next) => {
  let user = sessionStorage.getItem('user') === null ? null : sessionStorage.getItem('user')
  let token = sessionStorage.getItem('token') === null ? null : sessionStorage.getItem('token')
  let codeType = null
  if (user === null) {
    codeType = null
  } else {
    codeType = user.codetype
  }
  console.log(to)
  console.log(user)
  console.log(token)
  console.log(codeType)
  loading = Loading.service({
    fullscreen: true,
    target: '.content-wrapper',
    text: '跳转中...'
  })
  // 没有该页面
  if (!to.matched.length) {
    next({
      path: '/error/404',
      replace: true
    })
  // 登录页面直接跳转
  } else if (to.name === 'login') {
    next()
  // token、user失效
  } else if (user === null || token === '') {
    console.log('null user')
    next({
      path: '/login',
      replace: true
    })
  //  没有权限
  } else if (codeType !== null && (to.meta.role).indexOf(codeType) === -1) {
    next({
      path: '/error/403',
      replace: true
    })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // 解决某些情况下loading无法关闭的情况
  setTimeout(() => {
    loading.close()
  }, 0)
})

export default router
