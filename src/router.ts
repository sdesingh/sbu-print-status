import Vue from 'vue';
import Router from 'vue-router';
import Printers from './views/Printers/Printers.vue';
import Logs from './views/PrinterLogs/Logs.vue';
import About from './views/About.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.NODE_ENV == 'production' ? '/printers' : process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'printers',
      component: Printers
    },
    {
      path: '/logs',
      name: 'logs',
      component: Logs
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    },
  ],
});
