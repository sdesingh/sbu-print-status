<template>
  <div class="home">
    <printer-summary v-for="(item, index) in printerData" :key="index" :status="item"/>
    <button type="submit" @click="get">Refresh</button>
    
  </div>
</template>

<script>
// @ is an alias to /src
import PrinterSummary from '@/components/PrinterSummary.vue'

export default {
  name: 'home',
  components: {
    PrinterSummary
  },
  methods: {
    get(){
      this.$store.dispatch('getData')
    }
  },
  computed: {
    printerData() {
      
      return this.$store.state.printer_data.printers
    }
  }
    
}
</script>
