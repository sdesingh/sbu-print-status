<template>
  <div id="home">
    
    <div id="printers">
      <printer-summary class="printer" v-for="(item, index) in printerData" :key="index" :status="item"/>
    </div>
    
  </div>
  
</template>

<style scoped>

  #printers {
    display: grid;
    margin: 100px 100px;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
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
    PrinterSummary,
  },
  methods: {
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
