// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from './api'

import store from './store'
// import VeLine from 'v-charts/lib/bmap'
// 引入elementui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'

import VCharts from 'v-charts'
import sxForm from './components/form'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
// 引入样式文件
import '../src/assets/css/variable.scss'
import '../src/assets/css/base.scss'
import '../src/assets/css/common.scss'
import '../src/assets/css/iconfont.css'
// 引入svg组件
import iconSvg from './components/icon.vue'
// 全局注册icon-svg
Vue.component('iconSvg', iconSvg)
Vue.component('sx-form', sxForm)
if (process.env.NODE_ENV === 'production') {
  Vue.use(window.require('vue-electron'))
}
// Vue.component(VeLine.name, VeLine)
Vue.use(ElementUI)
Vue.use(Viewer)
Vue.use(VCharts)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
