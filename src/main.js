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
import './config'



import App from './App'
import Home from './components/Home'
import User from './components/User'
import UserCity from './components/UserCity'
import Role from './components/Role'
import Permission from './components/Permission'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(NProgress)

// NProgress.configure({ parent: '[c-title]' });


var router = new VueRouter({
  routes: [
    { path: '/home', component: Home, name: "首页" },
    { path: '/user', component: User, name: "用户列表" },
    { path: '/usercity', component: UserCity, name: "用户城市管理" },
    { path: '/role', component: Role, name: "角色管理" },
    { path: '/permission', component: Permission, name: "权限管理" },
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
