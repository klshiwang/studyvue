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
  },{
    path: '/role',
    name: '角色管理',
    component: () => import(/* webpackChunkName: "role" */ '../views/role.vue')
  },{
    path: '/klbase',
    name: '知识库管理',
    component: () => import(/* webpackChunkName: "klbase" */ '../views/klbase.vue')
  },{
    path: '/notice',
    name: '知识库管理',
    component: () => import(/* webpackChunkName: "notice" */ '../views/notice.vue')
  },{
    path: '/salesman',
    name: '业务员管理',
    component: () => import(/* webpackChunkName: "salesman" */ '../views/salesman.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
