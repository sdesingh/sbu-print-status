import { printer_URLs, refreshRate } from '../printerSettings'

export default {
  // Load settings to be the default values.
  state: {
    refreshRate: refreshRate,
    useTestData: true,
    supplyThreshold: 1000,
    timeout: 1000,
    showNotifications: true,
    printerURLs: printer_URLs
  },
  mutations: {
    addPrinter(state, printer_url) {
      state.printerURLS.push(printer_url)
    },
    setRefreshRate(state, refreshRate){
      state.refreshRate = refreshRate
    },
    toggleUseTestData(state){
      state.useTestData = !state.useTestData
    },
    toggleNotifications(state){
      state.showNotifications = !state.showNotifications
    }
  }
}