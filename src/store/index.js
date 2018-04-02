import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
// vuex插件，当修改变量值得时候，能打印修改之前变量值
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  //  开发时为严格模式
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
