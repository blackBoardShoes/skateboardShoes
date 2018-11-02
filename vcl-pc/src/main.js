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

import sxForm from './components/dynamicForm'
import sxShowMin from './components/dynamicForm/showMin.vue'
import sxMinForm from './components/dynamicForm/minIndex'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
// 引入样式文件
import '../src/assets/css/variable.scss'
import '../src/assets/css/base.scss'
import '../src/assets/css/common.scss'
import '../src/assets/css/element-variable.scss'
import '../src/assets/css/iconfont.css'
// 引入svg组件
import iconSvg from './components/icon.vue'
// 引入echarts主模块（基础模块）
import ECharts from 'vue-echarts/components/ECharts.vue'

// 引入需要的echarts如表
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'

// 引入需要的 echarts的交互组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legend/ScrollableLegendModel'
import 'echarts/lib/component/legend/ScrollableLegendView'
import 'echarts/lib/component/legend/ScrollableLegendAction'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataZoom'
// 全局注册icon-svg
Vue.component('iconSvg', iconSvg)
Vue.component('sx-show-min', sxShowMin)
Vue.component('sx-form', sxForm)
Vue.component('sx-min-form', sxMinForm)
if (process.env.NODE_ENV === 'production') {
  Vue.use(window.require('vue-electron'))
}
// Vue.component(VeLine.name, VeLine)
Vue.use(ElementUI)
Vue.use(Viewer)
Vue.component('chart', ECharts)
Vue.prototype.cancelAjax = () => {
  axios.CancelToken.source().cancel('what')
}
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
