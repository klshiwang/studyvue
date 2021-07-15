import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/log',
    name: '日志管理',
    component: () => import(/* webpackChunkName: "log" */ '../views/log.vue')
  },{
    path: '/dict',
    name: '字典管理',
    component: () => import(/* webpackChunkName: "dict" */ '../views/dict.vue')
  },{
    path: '/dictlist',
    name: '字典列表',
    component: () => import(/* webpackChunkName: "dictlist" */ '../views/dictlist.vue')
  },{
    path: '/menu',
    name: '菜单管理',
    component: () => import(/* webpackChunkName: "menu" */ '../views/menu.vue')
  },{
    path: '/user',
    name: '用户管理',
    component: () => import(/* webpackChunkName: "user" */ '../views/user.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
