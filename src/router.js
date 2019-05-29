import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Logs from './views/Logs.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV == "production" ? '/printers' : process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/logs',
      name: 'Logs',
      component: Logs
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
