// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

import App from './App'
import Home from './components/Home'
import User from './components/User'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    { path: '/users', component: User },
    { path: '/home', component: Home }
  ]
})

new Vue({
  el: '#app',
  template: '<App/>',
  router:router,
  components: { App }
}).$mount('#app')




