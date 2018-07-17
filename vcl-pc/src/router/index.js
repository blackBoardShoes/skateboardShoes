import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../../src/store'
import { routers } from './router'
import { Loading } from 'element-ui'
// import { setTitle } from 'src/assets/js/util'

Vue.use(VueRouter)

const routerConfig = {
  mode: 'hash',
  linkActiveClass: 'active',
  routes: routers
}

const router = new VueRouter(routerConfig)

let loading
router.beforeEach((to, form, next) => {
  loading = Loading.service({
    fullscreen: true,
    target: '.content-wrapper',
    text: '跳转中...'
  })
  let token = store.state.token
  if (!to.matched.length) {
    next({
      path: '/error/404',
      replace: true
    })
  } else if (to.name === 'home' && !token && sessionStorage.getItem('token') === '') {
    next({
      path: '/login'
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
