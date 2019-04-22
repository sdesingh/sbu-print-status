import { printer_data, supply_thresholds, refreshRate, timeout, baseUrl } from '../printerSettings'
import cookies from 'vue-cookies'

export default {
  // Load settings to be the default values.
  state: {
    refreshRate: refreshRate,
    useTestData: false,
    supplyThresholds: [
      {name: 'Toner', value: 1500},
      {name: 'Drum Kit', value: 2000},
      {name: 'Maintenance Kit', value: 5000}
    ],
    timeout: timeout,
    showNotifications: false,
    printer_data: printer_data,
    baseUrl: baseUrl
  },
  mutations: {
    addPrinter(state, printer_url) {
      state.printerURLS.push(printer_url)
    },
    setRefreshRate(state, refreshRate){
      state.refreshRate = refreshRate
    },
    updateThresholds(state, supplyThresholds){
      state.supplyThresholds = supplyThresholds;
    },
    setDefaultSettings(state, settings){
      state.refreshRate = settings.refreshRate;
      state.useTestData = settings.useTestData;
      state.supplyThresholds = settings.supplyThresholds;

    },
    toggleSetting(state, settingName){
      state[settingName] = !state[settingName];
      cookies.set(settingName, state[settingName])
    }
    
  },
  actions: {

    loadDefaultSettings({dispatch, commit}){
      // Settings exist, load user preferences.
      if(cookies.get('supplyThresholds')){

        let settings = {
          refreshRate: parseInt(cookies.get('refreshRate')),
          useTestData: cookies.get('useTestData') === "true" ? true : false,
          supplyThresholds: JSON.parse(cookies.get('supplyThresholds')),
          showNotifications: cookies.get('showNotifications')
        }
        
        // Convert the string values to ints.
        settings.supplyThresholds.forEach(threshold => {
          threshold.value = parseInt(threshold.value)
        });
      
        commit('setDefaultSettings', settings)
      }
      // Settings haven't been created. Create defaults.
      else {
        cookies.set('refreshRate', refreshRate, -1)
        cookies.set('useTestData', false, -1)
        cookies.set('supplyThresholds', JSON.stringify(supply_thresholds))
      }
    },
    loadDefaults({}){

      
    },
    saveSettings({state}){
      cookies.set('refreshRate', state.refreshRate, -1);
      cookies.set('useTestData', state.useTestData, -1);
      let thresholds = JSON.stringify(state.supplyThresholds);
      cookies.set('supplyThresholds', thresholds, -1);
    }
  }
}