import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// 应用示例见 Main.vue 以及 YHCommon.js 中 检索 store
// 定义状态(变量)
const state = {
  todos: [
    { id: 1, text: '001', done: true },
    { id: 2, text: '002', done: false }
  ],
  intervalArr: [],
  setting: {
    isWX: false,
    isDingTalk: false,
    isAPP: false,
    isPC: false,
    goOn: true,
    showHeader: true,
    headerTitle: '首页',
    sysBlack: true, // true 使用物理返回
    hasListenSysBack: false,
    NetWork: 0, // 1 离线, 2 在线, 3 外网4G, 4 外网WIFI, 5 内网4G, 6 内网WIFI
    hasListenSysNet: false
  },
  touchs: {
    x: null,
    y: null
  }
}

// 获取状态(变量的值)
const getters = {
  doneTodos: state => {
    return state.todos.filter(todo => todo.done)
  }
}

// 修改state里面的变量(修改变量的值)
const mutations = {
  uploadSetting_Evn (state, payload) {
    // state为上面的state, payload为传进来的参数
    state.setting.isDingTalk = payload
  }
}

// Action 触发 mutation 函数,从而修改状态
const actions = {}

// Module 当状态很多时,把状态分开来管理
const modules = {}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules
})
