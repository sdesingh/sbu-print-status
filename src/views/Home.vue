<template>
  <div id="home">

    <div id="printers">
      <!-- <printer-summary class="printer" v-for="(item, index) in printerData" :key="index" :status="item"/> -->
      <printer-card class="printer" v-for="(printer, index) in printerData" :key="index" :printer="printer"></printer-card>
    </div>
    
  </div>
  
</template>

<style scoped>

  #printers {
    display: grid;
    margin: 20px;
    grid-template-columns: repeat(auto-fill, minmax(355px, 1fr));
    grid-template-rows: minmax(min-content, max-content);
    grid-gap: 10px;
  }

</style>


<script>

// @ is an alias to /src
import PrinterSummary from '@/components/PrinterSummary.vue'
import PrinterCard from '@/components/PrinterInfoCard.vue'


export default {
  name: 'home',
  components: {
    PrinterSummary,
    PrinterCard
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
