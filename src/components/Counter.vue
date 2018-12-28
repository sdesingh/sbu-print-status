<template>
  <div>
    Refreshing in... {{ count }}s.
  </div>
</template>

<script>
import { setInterval } from 'timers';
import { settings } from '../model/printerSettings.js'

export default {
  data(){
    return {
      count: settings.refreshRate * 60
    }
  },
  mounted(){

    setInterval(() => {
      
      this.$store.dispatch('update')

      if(this.count == 1){
        this.count = 60 * settings.refreshRate
        this.$store.dispatch('getData')
      } 
      else {
        this.count--
      }

    }, 1000)
  }
}
</script>