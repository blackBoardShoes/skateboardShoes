import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/c',
      name: 'start',
      component: () => import('../components/calculate.vue')
    },
    {
      path: '/',
      name: 'c',
      component: () => import('../components/gc.vue')
    }
  ]
})
