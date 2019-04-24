<template>
  <div class="card text-white" :class="getPrinterStyle()">

      <div class="card-body">

        <div class="d-flex align-items-right">
          <h2 class="card-title font-weight-bold"> {{ printer.name }} </h2>
          <!-- <div class="spinner-grow text-white ml-auto" role="status" v-if="printer.printerStatus <= 2"></div> -->
        </div>  

        <h6 class="card-subtitle text-white">{{ printer.statusMessage }} </h6>
    
      </div>

        <ul class="list-group list-group-flush bg-light text-dark" v-if="printer.printerStatus <= 2">

          <li class="list-group-item text-monospace"
              :class="trayStyle(tray.setting)"
              v-for="(tray, index) in printer.trays" :key="index"
          >
            <!-- Tray Information -->
            <div class="row">
              <div class="col font-weight-bold"> {{ tray.name }} </div>

              <div class="col text-center"> {{ tray.setting }} </div>

              <div class="col text-right"> 
                <span :class="getBadgeStyle(tray.statusCode)" class="badge"> {{ tray.trayStatus() }} </span> 
              </div>
            </div>
            
          </li>

          <div v-if="printer.trays.length < 4">

            <li class="list-group-item list-group-item-action">
            <!-- Tray Information -->
              <div class="row">
                <div class="col font-weight-bold text-center"> - </div>

                <div class="col text-center"> - </div>

                <div class="col text-center"> - </div> 

              </div>
            </li>

            <li class="list-group-item list-group-item-action">
            <!-- Tray Information -->
              <div class="row">
                <div class="col font-weight-bold text-center"> - </div>

                <div class="col text-center"> - </div>

                <div class="col text-center"> - </div>

              </div>
            </li>

          </div>
          

          <!-- Supply Information -->
          <div class="container text-dark text-center">

            <div class="row justify-content-between">

              <div class="btn col" :class="supplyStyle(supply)" v-for="(supply, index) in supplies" :key="index">
                <i class="fas" :class="'fa-' + supply.icon"></i>
                <span class="ml-2 text-monospace" style="font-size: 14px"> {{ supply.data_mini }}</span>
                <div class="tooltip"> {{ supply.data }} </div>
              </div>


            </div>

          </div>
        
        </ul>
    
        
        <div class="card-footer">
          <i class="fas mr-3 my-auto" :class="statusIcons[printerStatusCode]" id="status-icon"></i>
          <small class="text-white my-auto">{{ printerSubMessage() }} </small>
          
        </div>

  </div>
</template>

<style scoped>

  .fas {
    font-size: 16px;
  }

  .card {
    /* border: 0; */
    transition: 0.2s linear
  }

  .badge {
    font-size: 13px;
  }

  .btn {
    border-radius: 0;
  }

</style>

<script>

import { Printer } from '../model/Printer.js'
export default {
  data(){
    return {
      // printer: {},
      statusStyles: ['success', 'warning', 'danger', 'dark'],
      statusIcons: ['fa-check-circle', 'fa-exclamation-triangle', 'fa-times', 'fa-power-off' ]
    }
  },
  props: ['printer'],
  mounted(){

  },
  computed: {
    supplies(){
      return [
        {
          icon: 'tint', 
          data: this.printer.tonerStatus, 
          data_mini: this.commaNumber(this.printer.tonerStatus.substring(0, this.printer.tonerStatus.indexOf("-"))),
          statusCode: this.printer.tonerStatusCode(this.supplyThresholds[0].value)
        }, 
        {
          icon: 'drum', 
          data: this.printer.drumStatus, 
          data_mini: this.commaNumber(this.printer.drumStatus.substring(0, this.printer.drumStatus.indexOf("-"))),
          statusCode: this.printer.drumStatusCode(this.supplyThresholds[1].value)
        }, 
        {
          icon: 'tools', 
          data: this.printer.maintKitStatus, 
          data_mini: this.commaNumber(this.printer.maintKitStatus.substring(0, this.printer.maintKitStatus.indexOf(" "))),
          statusCode: this.printer.maintKitStatusCode(this.supplyThresholds[2].value)
        }
      ]
    },
    supplyThresholds(){
      return this.$store.state.settings.supplyThresholds;
    },
    printerStatusCode(){

      const printer = this.printer;
      const thresholds = this.supplyThresholds;

      if(printer.isOffline()) return 3;

      let tonerStatus = printer.tonerStatusCode(thresholds[0].value);
      let drumStatus = printer.drumStatusCode(thresholds[1].value);
      let trayStatusCode = printer.trayStatusCode();
      let maintKitStatus = printer.maintKitStatusCode(thresholds[2].value);
      let isJammed = printer.printerJamStatusCode();

      return Math.max(tonerStatus, drumStatus, maintKitStatus, isJammed, trayStatusCode);
    }
  },
  methods: {
    getBadgeStyle(statusCode){
      let badge = 'badge-' + this.statusStyles[statusCode];
      return badge; 
    },
    getPrinterStyle(){
      let style = "bg-" + this.statusStyles[this.printerStatusCode];
      return style;
    },
    printerSubMessage(){
      if(this.printer.printerStatus >= 3){
        return 'Cannot reach the printer.';
      }else{
        return 'Pages Printed: ' + this.printer.pagesPrinted.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    supplyStyle(supplyItem){
     let statusCode = supplyItem.statusCode;
     const prefix = 'btn-';

     if(statusCode === 0) return prefix + 'light';
     else return prefix + this.statusStyles[statusCode];
    },
    trayStyle(traySetting){
      return traySetting === "Letter" ? "list-group-item-action" : "list-group-item-danger"
    },
    commaNumber(number){
      return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
}
</script>