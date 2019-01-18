
export default {
  state: {
    showSettings: false,
    showOnboarding: true
  },
  mutations: {
    toggleSettings(state) { 
      state.showSettings = !state.showSettings
    },
    toggleOnboarding(state) {
      state.showOnboarding = !state.showOnboarding
    }
  }
}