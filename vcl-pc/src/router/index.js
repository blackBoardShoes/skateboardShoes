import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../../src/store'
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
  let token = store.state.token
  let codeTpye = sessionStorage.getItem('user') === null ? null : sessionStorage.getItem('user').userType
  loading = Loading.service({
    fullscreen: true,
    target: '.content-wrapper',
    text: '跳转中...'
  })
  if (!to.matched.length) {
    next({
      path: '/error/404',
      replace: true
    })
  } else if (to.name === 'home' && (token === '' || !token) && sessionStorage.getItem('token') === '') {
    console.log('to login')
    next({
      path: '/login',
      replace: true
    })
    // 判断用户是否有权限进入该页面
  } else if (codeTpye !== null && (to.meta.role).indexOf(codeTpye) === -1) {
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
