import moment from 'moment'

export default {
  state: {
    currentTime:  '',
    counter: 1
  },
  mutations: {
    // Increments the counter.
    decrementCounter(state){
      state.counter--
    },
    // Reset the counter.
    setCounter(state, counter_value){
      state.counter = counter_value
    }
  },
  actions: {

    // Called every second.
    // Dispatches different state related actions.
    update({commit, state, dispatch, rootState}){
      const now = moment()
      state.currentTime = now.format('LT')

      // Dispatch different actions.
      if(state.counter == 1){

        const counter_value = rootState.settings.refreshRate * 60
        commit('setCounter', counter_value) // Reset the counter.

        dispatch('getData') // Update data.

      }else {
        commit('decrementCounter') // Decrement Counter.
      }
    },
    resetCounter({commit, rootState}){
      const refreshRate = rootState.settings.refreshRate
      commit('setCounter', refreshRate * 60)
    },
    loadCookies(){

    }
  }
}