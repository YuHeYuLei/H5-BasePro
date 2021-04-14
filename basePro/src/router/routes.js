import Vue from 'vue/dist/vue.js'
// import Vue from 'vue'
import Router from 'vue-router'
import Main from '../components/Main'
import home from '../components/home'
import dbList from '../components/dbList'
import dbDetail from '../components/dbDetail'
import dbDetail_oncallhdm from '../components/dbDetail_oncallhdm'
import taskCenter from '../components/taskCenter'
import taskCenter_launch from '../components/taskCenter_launch'
import taskCenter_launch_detail from '../components/taskCenter_launch_detail'
import selectPerson from '../components/selectPerson'
import setting from '../components/setting'
import technology from '../components/technology.vue'
import pixi from '../components/pixi.vue'
import star from '../components/star.vue'
import MouseTrail from '../components/MouseTrail.vue'
import Collision from '../components/Collision.vue'
import SimplePlane from '../components/SimplePlane.vue'
import echartsT1 from '../components/echartsT1'
import echartsT2 from '../components/echartsT2'

Vue.use(Router)
// 获取原型对象上的push函数
const originalPush = Router.prototype.push
// 修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// replace同理
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

export default new Router({
  // mode: 'history',
  base: __dirname,
  linkActiveClass: 'active',
  routes: [{
      name: 'Main',
      path: '/',
      component: Main,
      children: [{
          name: 'home',
          path: '/home',
          component: home
      },{
        name: 'dbList',
        path: '/dbList',
        component: dbList
      },{
        name: 'dbDetail',
        path: '/dbDetail',
        component: dbDetail,
        children: [
          {
            name: 'dbDetail_oncallhdm',
            path: '/dbDetail_oncallhdm',
            component: dbDetail_oncallhdm
          }
        ]
      },{
        name: 'setting',
        path: '/setting',
        component: setting
      },{
        name: 'echartsT1',
        path: '/echartsT1',
        component: echartsT1
      },{
        name: 'echartsT2',
        path: '/echartsT2',
        component: echartsT2
      },{
        name: 'taskCenter',
        path: '/taskCenter',
        component: taskCenter
      },{
        name: 'taskCenter_launch',
        path: '/taskCenter_launch',
        component: taskCenter_launch,
        children: [{
          name: 'taskCenter_launch_detail',
          path: '/taskCenter_launch_detail',
          component: taskCenter_launch_detail
        },{
          name: 'selectPerson',
          path: '/selectPerson',
          component: selectPerson
        }]
      },{
        name: 'technology',
        path: '/technology',
        component: technology
      },{
        name: 'pixi',
        path: '/pixi',
        component: pixi
      },{
        name: 'star',
        path: '/star',
        component: star
      },{
        name: 'MouseTrail',
        path: '/MouseTrail',
        component: MouseTrail
      },{
        name: 'Collision',
        path: '/Collision',
        component: Collision
      },{
        name: 'SimplePlane',
        path: '/SimplePlane',
        component: SimplePlane
      }]
  }]
})
