// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import 'font-awesome/css/font-awesome.css';
import VueResource from 'vue-resource'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'
import vueCookie from 'vue-cookie'

import './config'



import App from './App'
import Login from './components/Login'
import Main from './components/Main'
import DashBord from './components/DashBord'
import User from './components/User'
import UserCity from './components/UserCity'
import Role from './components/Role'
import Permission from './components/Permission'
import SysUser from './components/SysUser'
import Region from './components/Region'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(NProgress)
Vue.use(vueCookie)

// NProgress.configure({ parent: '[c-title]' });


var router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: Login,
      name: "登录",
    },
    {
      path: '/',
      component: Main,
      children: [
        { path: '/dashbord', component: DashBord, name: "仪表盘" },
        { path: '/user', component: User, name: "用户列表" },
        { path: '/role', component: Role, name: "角色管理" },
        { path: '/region', component: Region, name: "城市区域管理" },
        { path: '/permission', component: Permission, name: "权限管理" },
        { path: '/sysUser', component: SysUser, name: "系统用户管理" },
      ]
    }
  ]
})

new Vue({
  el: '#app',
  template: '<App/>',
  router: router,
  components: { App }
}).$mount('#app')

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(transition => {
  NProgress.done();
});
