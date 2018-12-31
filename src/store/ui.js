
export default {
  state: {
    showSettings: false
  },
  mutations: {
    toggleSettings(state) { 
      state.showSettings = !state.showSettings
     }
  }
}