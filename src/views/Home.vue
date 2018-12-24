<template>
  <div class="home">

    <button type="submit" @click="get">Refresh</button>

    <counter/>
    
    <div id="printers">
      <printer-summary class="printer" v-for="(item, index) in printerData" :key="index" :status="item"/>
    </div>

    <div id="time"> {{ $store.state.notif.currentTime }} </div>
    
  </div>
</template>

<style scoped>
  #printers {
    display: grid;
    /* grid-template-columns: repeat(4, 1fr); */
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-gap: 10px;
  }

  .printer {
    cursor: default;
  }

  #time {
    font-family: 'Product Sans', sans-serif;
    font-weight: 700;
    font-size: 30px;
  }

</style>


<script>

// @ is an alias to /src
import PrinterSummary from '@/components/PrinterSummary.vue'
import Counter from '@/components/Counter.vue'

export default {
  name: 'home',
  components: {
    PrinterSummary,
    Counter,
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
