import Vue from 'vue';
import Router from 'vue-router';

// Pages
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/logs',
      name: 'logs',
      component: () => import('@/views/PrinterLogs/Logs.vue'),
    },
    {
      path: '/printers',
      name: 'printers',
      component: () => import('./views/Printers/Printers.vue'),
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
