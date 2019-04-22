// Main Imports
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// Plugins and Libraries
import './plugins/axios'
import 'bootstrap'
import './views/styles.scss'


Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

