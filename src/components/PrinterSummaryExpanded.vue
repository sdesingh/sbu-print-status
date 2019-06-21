<template>
  <div>
  
    <!-- Display the name of the Printer Location. -->
    <span id="titlebar" class="ml-5">
      {{ printerData.name }}  
    </span>
    <span class="spinner-grow mb-2" :class="'text-' + statusStyles[printerStatusCode]" role="status"  v-if="!printerData.isOffline()"></span>

    <!-- Supply Information (Row 1) -->
    <div id="supply-information" class="mx-5 my-3" v-if="!printerData.isOffline()">
      
      <div class="card text-white bg-success mr-3" :class="'bg-' + statusStyles[printerData.tonerStatusCode(supplyThresholds[0].value)]">
        <div class="card-header">Toner</div>
        <div class="card-body">
          <h1 style="font-weight: 600;"> {{ printerData.tonerStatus }}%</h1>
      </div>
    </div>

      <div class="card text-white bg-success mr-3" :class="'bg-' + statusStyles[printerData.drumStatusCode(supplyThresholds[1].value)]">
        <div class="card-header">Drum Kit</div>
        <div class="card-body">
          <h1 style="font-weight: 600;"> {{ printerData.drumStatus }}%</h1>
        </div>
      </div>

      <div class="card text-white bg-success" :class="'bg-' + statusStyles[printerData.maintKitStatusCode(supplyThresholds[2].value)]">
        <div class="card-header">Maintenance Kit</div>
        <div class="card-body">
          <h1 style="font-weight: 600;"> {{ printerData.maintKitStatus }}%</h1>
        </div>
      </div>



    </div>

    <!-- Supply Information (Row 2) -->
    <div id="supply-information2">

      <div class="card ml-5 mt-3">
        <div class="card-body"> {{ printerData.statusMessage }} </div>
      </div>

      <div class="card mt-3 mx-5" v-if="!printerData.isOffline()">
        <span style="font-weight: 600; font-size: 30px" class="mx-auto my-auto"> {{ pagesPrinted }} Pages </span>
      </div>

    </div>

    <!-- Chart Showing Pages Printed -->
    <line-graph :height="90" :chartData="graphData" :options="graphOptions"  class="mx-5 my-5" v-if="!printerData.isOffline()"/>

  </div>
</template>


<script>


import LineGraph from '../components/Graphs/LineGraph'
import GraphTemplates from '../components/Graphs/Templates'

export default {
  data(){
    return {
      statusStyles: ['success', 'warning', 'danger', 'dark'],
      graphOptions: GraphTemplates.CLEAN,
      graphData: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Pages Printed',
            // backgroundColor: ""
            data: [5, 1, 2, 4, 1, 8, 4]
          }
        ]
    }
    }
  },
  components: {
    LineGraph
  },
  computed: {
    printerData(){
      return this.$store.state.printer_data.printers[this.$route.params.id]
    },
    printers(){
      return this.$store.state.printer_data.printers
    },
    supplyThresholds(){
      return this.$store.state.settings.supplyThresholds;
    },
    printerStatusCode(){

      const printer = this.printerData;
      const thresholds = this.supplyThresholds;

      if(printer.isOffline()) return 3;

      let tonerStatus = printer.tonerStatusCode(thresholds[0].value);
      let drumStatus = printer.drumStatusCode(thresholds[1].value);
      let trayStatusCode = printer.trayStatusCode();
      let maintKitStatus = printer.maintKitStatusCode(thresholds[2].value);
      let isJammed = printer.printerJamStatusCode();

      return Math.max(tonerStatus, drumStatus, maintKitStatus, isJammed, trayStatusCode);
    },
    pagesPrinted(){
      return this.commaNumber(this.printerData.pagesPrinted.toString())
    }
  },
  methods: {
    commaNumber(number){
      return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  }
}

</script>


<style scoped>

  #titlebar {
    font-weight: 600;
    font-size: 50px;
  }

  #supply-information {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr;
  }

  #supply-information2 {
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 500px;
  }
</style>
