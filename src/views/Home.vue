<template>
  <div class="home">
    <button type="submit" @click="get">Refresh</button>
    <div id="printers">
      <printer-summary class="printer" v-for="(item, index) in printerData" :key="index" :status="item"/>
    </div>
    
    
    
  </div>
</template>

<style scoped>
  #printers {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
  }

  .printer {
    cursor: default;
  }

</style>


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
    },
  },
  computed: {
    printerData() {
      return this.$store.state.printer_data.printers
    }
  },
  mounted() {
      this.$store.dispatch('init')
      this.$store.dispatch('getData')
    }
    
}
</script>
