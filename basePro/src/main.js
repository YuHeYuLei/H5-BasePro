// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue/dist/vue.js'
// import Vue from 'vue'
import App from './App'
import router from './router/routes'
import store from './store'
import Vant from 'vant'
import xss from 'xss'
import DD from 'dingtalk-jsapi'
import mui from './assets/js/mui'
// import YHCommon from './assets/js/YHCommon'
import YHCommon from './assets/js/YHCommon.min'
import epmsAxios from './assets/js/epmsAxios'
import axios from 'axios'
import eruda from 'eruda'
import './registerServiceWorker'
import 'lib-flexible'
import './plugins/rem.js'
import Utils from './assets/js/utils'
import Clipboard from 'clipboard'
import messenger from './assets/js/messenger.js'
import VueLazyload from 'vue-lazyload'
import * as PIXI from 'pixi.js'
import HADLogin from './assets/js/HADLogin'
import * as echarts from 'echarts'

Vue.use(Vant)
Vue.use(VueLazyload, {
  lazyComponent: true
})
// 全局指令
Vue.directive('keybordChange', {
  // 每当指令绑定到元素上的时候,会执行这个bind函数 只触发执行一次 纯input\textarea等可用
  bind: function (el) {
    // 在元素刚绑定指令的时候 还没有插入到DOM中去 这个时候 调用focus()方法没有作用
    // 因为一个元素只有插入DOM之后 才能获取焦点
    // 所以el.focus()用到这里是不对的
    // el.focus();
  },
  // 和js行为相关的 在inserted中操作
  // 表示元素插入到DOM中的时候 会执行inserted函数 只触发执行一次
  // 使用方式 将v-keybordChange 放置到input textarea的父节点中，要求该父节点下仅有一个该类型的输入框
  inserted: function (el) {
    console.log(el)
    let originalHeight = document.body.clientHeight
    // 取里面的input元素
    if (el.querySelectorAll('input')[0]) {
      el.querySelectorAll('input')[0].onfocus = function (e) {
        let self = this
        new Promise(function (resolve) {
          setTimeout(function () {
            document.getElementsByClassName('MainDiv')[0].style.height = '140vh'
            resolve()
          }, 100)
        }).then(function () {
          function pageY (elem) {
            return elem.offsetParent ? elem.offsetTop + pageY(elem.offsetParent) : elem.offsetTop
          }
          document.getElementsByClassName('addContent')[0].style.width = '100%'
          document.getElementsByClassName('addContent')[0].style.height = '10vh'
          document.getElementsByClassName('addContent')[0].style.lineHeight = '10vh'
          document.getElementsByClassName('addContent')[0].style.color = '#e5e5e5'
          document.getElementsByClassName('addContent')[0].style.textAlign = 'center'
          document.getElementsByClassName('addContent')[0].style.fontSize = '15px'
          document.getElementsByClassName('addContent')[0].style.fontWeight = '600'
          document.getElementsByClassName('addContent')[0].style.borderTop = '1px #e5e5e5 solid'
          document.getElementsByClassName('addContent')[0].innerHTML = '点击这里退出输入辅助'
          // document.getElementsByClassName('addContent')[0].style.textShadow = '1px 1px 3px #00a486'
          window.scrollTo(0, pageY(self) - originalHeight / 4)
        })
      }
      el.querySelectorAll('input')[0].onblur = function () {
        // 检查当前获取到焦点的元素 如果是input则不执行
        document.getElementsByClassName('MainDiv')[0].style.height = '100vh'
        document.getElementsByClassName('addContent')[0].innerHTML = ''
        document.getElementsByClassName('addContent')[0].style.height = '0'
      }
    }
    // textarea类
    if (el.querySelectorAll('textarea')[0]) {
      el.querySelectorAll('textarea')[0].onfocus = function (e) {
        let self = this
        new Promise(function (resolve) {
          setTimeout(function () {
            document.getElementsByClassName('MainDiv')[0].style.height = '140vh'
            resolve()
          }, 100)
        }).then(function () {
          function pageY (elem) {
            return elem.offsetParent ? elem.offsetTop + pageY(elem.offsetParent) : elem.offsetTop
          }
          document.getElementsByClassName('addContent')[0].style.width = '100%'
          document.getElementsByClassName('addContent')[0].style.height = '10vh'
          document.getElementsByClassName('addContent')[0].style.lineHeight = '10vh'
          document.getElementsByClassName('addContent')[0].style.color = '#e5e5e5'
          document.getElementsByClassName('addContent')[0].style.textAlign = 'center'
          document.getElementsByClassName('addContent')[0].style.fontSize = '15px'
          document.getElementsByClassName('addContent')[0].style.fontWeight = '600'
          document.getElementsByClassName('addContent')[0].style.borderTop = '1px #e5e5e5 solid'
          document.getElementsByClassName('addContent')[0].innerHTML = '点击这里退出输入辅助'
          // document.getElementsByClassName('addContent')[0].style.textShadow = '1px 1px 3px #00a486'
          window.scrollTo(0, pageY(self) - originalHeight / 4)
        })
      }
      el.querySelectorAll('textarea')[0].onblur = function () {
        // 检查当前获取到焦点的元素 如果是textarea则不执行
        document.getElementsByClassName('MainDiv')[0].style.height = '100vh'
        document.getElementsByClassName('addContent')[0].innerHTML = ''
        document.getElementsByClassName('addContent')[0].style.height = '0'
      }
    }
  },
  // 当组件 即vnode更新的时候 会触发该函数 可能触发执行多次
  updated: function (el) {}
})
Vue.config.productionTip = false
Vue.config.devtools = true
Vue.prototype.xss = xss
Vue.prototype.mui = mui
Vue.prototype.YHCommon = YHCommon
Vue.prototype.epmsAxios = epmsAxios
Vue.prototype.dd = DD
Vue.prototype.axios = axios
Vue.prototype.eruda = eruda
Vue.prototype.Clipboard = Clipboard
Vue.prototype.PIXI = PIXI
Vue.prototype.HADLogin = HADLogin
// 加密方法 app.$Utils方式引用
// app.$Utils.demoRequest(JSON.stringify(data)) 字符串加密
// app.$Utils.demoResponse(data) 字符串解密
Vue.prototype.$Utils = Utils
Vue.prototype.messenger = messenger
Vue.prototype.echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
})
