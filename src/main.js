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


import App from './App'
import Home from './components/Home'
import User from './components/User'
import UserCity from './components/UserCity'
import Role from './components/Role'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(VueResource)

var router = new VueRouter({
  routes: [
    { path: '/home', component: Home },
    { path: '/user', component: User },
    { path: '/usercity', component: UserCity },
    { path: '/role', component: Role },
  ]
})

new Vue({
  el: '#app',
  template: '<App/>',
  router:router,
  components: { App }
}).$mount('#app')




