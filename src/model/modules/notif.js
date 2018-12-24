import moment from 'moment'

export default {
  state: {
    currentTime:  ''
  },
  actions: {
    // Called every minute.
    update(context){
      const now = moment()
      context.state.currentTime = now.format('LTS')
    }
  }
}