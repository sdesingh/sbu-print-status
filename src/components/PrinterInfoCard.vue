<template>
  <div class="card ml-3 text-white" :class="getPrinterStyle()">

      <div class="card-body">

        <div class="d-flex align-items-right">
          <h2 class="card-title font-weight-bolder "> {{ printer.name }} </h2>
          <div class="spinner-grow text-white ml-auto" role="status" v-if="printer.printerStatus <= 2"></div>
        </div>  

        <h6 class="card-subtitle text-white">{{ printer.statusMessage }} </h6>
    
      </div>

        <ul class="list-group list-group-flush bg-light text-dark" v-if="printer.printerStatus <= 2">

          <li class="list-group-item list-group-item-action text-monospace"
              v-for="(tray, index) in printer.trays" :key="index"
          >
            <div class="row">
              <div class="col font-weight-bold"> {{ tray.name }} </div>
              <div class="col text-center"> {{ tray.setting }} </div>
              <div class="col text-right"> <span :class="getBadgeStyle(tray.statusCode)" class="badge"> {{ tray.trayStatus() }} </span> </div>
            </div>
            
          </li>


          <div class="container text-dark text-center">

            <div class="row justify-content-between">
              <div class="btn btn-light col"> 
                <i class="fas fa-tint"></i>   
                <div class="tooltip"> {{printer.tonerStatus }} </div>            
              </div>
              <div class="btn btn-light col"> 
                <i class="fas fa-paint-roller"></i> 
                <div class="tooltip"> {{printer.drumStatus }} </div>     
              </div>
              <div class="btn btn-light col"> 
                <i class="fas fa-tools"></i> 
                <div class="tooltip"> {{printer.maintKitStatus }} </div>     
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
      statusStyles: ['success', 'warning', 'danger', 'dark']
    }
  },
  props: ['printer'],
  mounted(){

  },
  methods: {
    getBadgeStyle(statusCode){
      let badge = 'badge-' + this.statusStyles[statusCode];
      return badge; 
    },
    getPrinterStyle(){
      let style = "bg-" + this.statusStyles[this.printer.printerStatus];
      return style;
    },
    test(){

    },
    printerSubMessage(){
      if(this.printer.printerStatus >= 3){
        return 'Cannot reach the printer.'
      }else{
        return (this.printer.printerType === 0) ? 'Print From Anywhere':'RCC Lab'
      }
    }
  }
}
</script>