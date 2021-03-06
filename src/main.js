import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
// Vuex仓库
import store from './store'
import fastclick from 'fastclick'
// 图片懒加载
import VueLazyload from 'vue-lazyload'

import 'common/stylus/index.styl'

// 防止eslint报错
/* eslint-disable no-unused-vars */
// import vConsole from 'vconsole'

fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
