import Vue from 'vue'
import Vuex from 'vuex'
import printer_data from './model/modules/printerData'
import notif from './model/modules/notif'
import ui from './model/modules/ui'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    printer_data,
    notif,
    ui
  },

})
