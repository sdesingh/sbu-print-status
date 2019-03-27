<template>
  <div class="card text-white" :class="getPrinterStyle()">

      <div class="card-body">

        <div class="d-flex align-items-right">
          <h2 class="card-title font-weight-bold"> {{ printer.name }} </h2>
          <div class="spinner-grow text-white ml-auto" role="status" v-if="printer.printerStatus <= 2"></div>
        </div>  

        <h6 class="card-subtitle text-white">{{ printer.statusMessage }} </h6>
    
      </div>

        <ul class="list-group list-group-flush bg-light text-dark" v-if="printer.printerStatus <= 2">

          <li class="list-group-item list-group-item-action text-monospace"
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

          <!-- Supply Information -->
          <div class="container text-dark text-center">

            <div class="row justify-content-between">

              <div class="btn col" :class="supplyStyle(supply)" v-for="(supply, index) in supplies" :key="index">
                <i class="fas" :class="'fa-' + supply.icon"></i>
                <div class="tooltip"> {{ supply.data }} </div>
              </div>


            </div>

          </div>
        
        </ul>
    
        

        <div class="card-footer">
          <small class="text-white">{{ printerSubMessage() }} </small>
        </div>

  </div>
</template>

<style scoped>

  .fas {
    font-size: 16px;
  }

  .card {
    /* border: 0; */
  }

  .badge {
    font-size: 13px;
  }

  .btn {
    border-radius: 0;
    position: relative;
    z-index: 1;
  }

  .tooltip {
    visibility: hidden;
    width: 100px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px;
    border-radius: 6px;

    /* Position the tooltip text */
    position: absolute;
    z-index: 1;
    top: 110%;

    /* Fade in tooltip */
    opacity: 0;
    transition: opacity 0.3s;

    /* Font */
    /* font-family: 'Open Sans', sans-serif; */
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
  }

  .tooltip::after {
    content: " ";
    position: absolute;
    bottom: 100%;  /* At the top of the tooltip */
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent black transparent;
  }

  .btn:hover .tooltip{
    visibility: visible;
    opacity: 1;
  }

</style>

<script>

import { Printer } from '../model/Printer.js'
export default {
  data(){
    return {
      // printer: {},
      statusStyles: ['success', 'warning', 'danger', 'dark'],
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
          statusCode: this.printer.tonerStatusCode(this.supplyThresholds[0].value)
        }, 
        {
          icon: 'paint-roller', 
          data: this.printer.drumStatus, 
          statusCode: this.printer.drumStatusCode(this.supplyThresholds[1].value)
        }, 
        {
          icon: 'tools', 
          data: this.printer.maintKitStatus, 
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
      let maintKitStatus = printer.maintKitStatusCode(thresholds[2].value);
      let isJammed = printer.printerJamStatusCode();

      return Math.max(tonerStatus, drumStatus, maintKitStatus, isJammed);
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
        return 'Pages Printed: ' + this.printer.pagesPrinted;
      }
    },
    supplyStyle(supplyItem){
     let statusCode = supplyItem.statusCode;
     const prefix = 'btn-';

     if(statusCode === 0) return prefix + 'light';
     else return prefix + this.statusStyles[statusCode];
    }
  }
}
</script>