import Vue from 'vue'
import Vuex from 'vuex'

import printer_data from './store/printerData'
import dispatcher from './store/dispatcher'
import ui from './store/ui'
import settings from './store/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    printer_data,
    dispatcher,
    ui,
    settings
  },

})
