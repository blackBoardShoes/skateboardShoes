import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/c',
      name: 'start',
      component: () => import('../views/content.vue')
    },
    {
      path: '/',
      name: 'c',
      component: () => import('../components/gc.vue')
    },
    {
      path: '/print',
      name: 'print',
      component: () => import('../components/print.vue')
    },
    {
      path: '/editInput',
      name: 'editInput',
      component: () => import('../components/editInput2.vue')
    }
  ]
})
