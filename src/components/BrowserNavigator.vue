<template>
  <div class="container">
    
    <div>

      <input type="text" class="form-control mb-3 " placeholder="Search... (turned off)">

      <!-- List of all the locations on campus. -->
      <div class="card">
        
        <!-- All West Campus Printers. -->
        <div class="card-header">West Campus</div>

        <!-- Loop through all the printers and add them to the list. -->
        <ul class="list-group list-group-flush">
          
          <router-link class="list-group-item list-group-item-action link"
          v-for="(printer, index) in printers" :key="index" :to="'/printer/' + index"> 

            <!-- Location Name -->
            {{ printer.name }} 

            <!-- Badge Showing Status Information -->
            <span 
            v-if="printer.printerStatus != 3"
            :class="'badge-' + statusStyles[printerStatusCodes[index]]" 
            class="badge float-right text-monospace my-auto"> 
              {{ statusNames[printerStatusCodes[index]] }}
            </span> 
          </router-link>

        </ul>

      </div>


    </div>



  </div>
</template>

<script>
export default {
  data(){
    return {
      statusStyles: ['success', 'warning', 'danger', 'dark'],
      statusNames: ['Good', 'Warning', 'Error', 'Offline']
    }
  },
  computed: {

    printers(){
      return this.$store.state.printer_data.printers
    },
    supplyThresholds(){
      return this.$store.state.settings.supplyThresholds;
    },
    printerStatusCodes(){
      let codes = []
      this.printers.forEach(printer => {
        
        const thresholds = this.supplyThresholds;

        if(printer.isOffline()) return 3;

        let tonerStatus = printer.tonerStatusCode(thresholds[0].value);
        let drumStatus = printer.drumStatusCode(thresholds[1].value);
        let trayStatusCode = printer.trayStatusCode();
        let maintKitStatus = printer.maintKitStatusCode(thresholds[2].value);
        let isJammed = printer.printerJamStatusCode();

        codes.push(Math.max(tonerStatus, drumStatus, maintKitStatus, isJammed, trayStatusCode));

      });
      return codes;
    },
  },
  methods: {

  }

}
</script>