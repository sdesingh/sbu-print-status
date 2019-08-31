import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Logs from './views/Logs.vue'
import PrinterDetail from './views/PrinterDetail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV == "production" ? '/printers' : process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // {
    //   path: '/logs',
    //   name: 'Logs',
    //   component: Logs
    // },
    {
      path: '/logs/:id',
      name: 'Printer Detail',
      component: PrinterDetail
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
  ]
})
