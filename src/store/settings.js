import { printer_URLs, refreshRate, timeout } from '../printerSettings'
import cookies from 'vue-cookies'

export default {
  // Load settings to be the default values.
  state: {
    refreshRate: refreshRate,
    useTestData: true,
    supplyThreshold: 1000,
    timeout: timeout,
    showNotifications: true,
    printerURLs: printer_URLs
  },
  mutations: {
    addPrinter(state, printer_url) {
      state.printerURLS.push(printer_url)
    },
    setRefreshRate(state, refreshRate){
      state.refreshRate = refreshRate
      cookies.set('refreshRate', refreshRate, -1)
    },
    setSupplyThreshold(state, threshold){
      if(threshold < 1){
        threshold = 1
      }
      state.supplyThreshold = threshold
      cookies.set('supplyThreshold', threshold, -1)
    },
    toggleUseTestData(state){
      state.useTestData = !state.useTestData
      cookies.set('useTestData', state.useTestData, -1)
    },
    toggleNotifications(state){
      state.showNotifications = !state.showNotifications
      cookies.set('showNotifications', state.showNotifications, -1)
    },
    setDefaultSettings(state, settings){
      state.refreshRate = settings.refreshRate
      state.useTestData = settings.useTestData === "true" ? true : false
      state.supplyThreshold = parseInt(settings.supplyThreshold)
      state.showNotifications = settings.showNotifications === "true" ? true : false
    },
    
  },
  actions: {

    loadDefaultSettings({dispatch, commit}){
      // Settings exist, load defaults.
      if(cookies.get('refreshRate')){

        let settings = {
          refreshRate: cookies.get('refreshRate'),
          useTestData: cookies.get('useTestData'),
          supplyThreshold: cookies.get('supplyThreshold'),
          showNotifications: cookies.get('showNotifications')
        }
        commit('setDefaultSettings', settings)
      }
      // Settings haven't been created. Create defaults.
      else {
        cookies.set('refreshRate', refreshRate, -1)
        cookies.set('useTestData', false, -1)
        cookies.set('supplyThreshold', 1500, -1)
        cookies.set('showNotifications', false, -1)
      }
    },
  }
}