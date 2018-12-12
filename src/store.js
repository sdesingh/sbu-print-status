import Vue from 'vue'
import Vuex from 'vuex'
import printer_data from './model/modules/printerData'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    printer_data
  },

})
