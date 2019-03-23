<template>
  <div id="summary" :style="printerStyle(status.printerStatus).status_summary">

    <div id="title-bar" :style="printerStyle(status.printerStatus).titlebar"> 
      <i id="status-icon" :class="statusIcon()"></i>
      {{ status.name }} 
    </div>

    <div v-if="status.printerStatus != 3">

      <div id="status-summary" > {{status.statusMessage}} </div>

      <div id="status-detail">

        <div id="paper-status">
            <div class="tray" v-for="(tray, index) in status.trays" :key="index"> 
              <div id="tray-name" class="font-weight-bold"> {{ tray.name }} </div>
              <div id="tray-size"> {{ tray.setting }} </div>
              <div id="tray-capacity" :style="trayStyle(tray.statusCode)"> {{ tray.trayStatus().toUpperCase() }} </div>
            </div>
        </div>

        <div id="supplies-status">

          <div class="supply" id="toner" :style="printerStyle(status.tonerStatusCode()).titlebar"> 
            Toner 
            <div class="tooltip"> {{ status.tonerStatus }} </div>
          </div>

          <div class="supply" id="drum" :style="printerStyle(status.drumStatusCode()).titlebar" > 
            Drum 
            <div class="tooltip"> {{ status.drumStatus }} </div>
          </div>
          <div class="supply" id="maintenance" :style="printerStyle(status.maintKitStatusCode()).titlebar">
            Kit 
            <div class="tooltip"> {{ status.maintKitStatus }} </div>
          </div>

      </div>
 

      </div>

    </div>


  </div>
</template>

<style scoped>

  .tooltip {
    visibility: hidden;
    width: 100px;
    background-color: #555;
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
    border-color: transparent transparent #555 transparent;
  }

  /* Show the tooltip text when you mouse over the tooltip container */
  .supply:hover .tooltip{
    visibility: visible;
    opacity: 1;
  }


  #summary {
    transition: 0.1s linear;
  }

  #status-icon {
    /* width: 10px; */
    font-size: 25px;

  }

  #status-summary {
    font-family: 'Google Sans', sans-serif;
    text-align: center; 
    padding: 10px;
    background: white;
  }

  #status-detail {
    /* font-family: 'Open Sans', sans-serif; */
    /* border: 1px solid #e9e9e9; */
    background: white;
    padding: 5px 20px;
    display: grid;
    grid-gap: 5px;
  }

  #paper-status {
    display: grid;
    padding: 10px 0;
    line-height: 30px;
    grid-gap: 10px;
    grid-auto-rows: 30px;
    grid-template-columns: 1fr;
    border-bottom: 0.5px solid rgba(0,0,0, 0.1);
    
  }

  #supplies-status {
    padding: 10px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-gap: 10px;
  }

  #title-bar {
    padding: 10px 0px;
    padding-left: 15px;
    font-family: 'Google Sans';
    font-size: 30px;
    font-weight: 600;
    color: white;
    background: #34495e;
  }

  #tray-capacity {
    /* font-family: 'Open Sans', sans-serif; */
    display: flex;
    justify-content: center;
    align-items: center;

    font-weight: 700;
    font-size: 12px;
    border-radius: 50px;
    color: white;
    background: #34495e;
  
  }

  .tray {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
  }

  .supply {
    position: relative;
    display: inline-block;
    z-index: 1;

    /* font-family: 'Open Sans', sans-serif; */
    font-size: 15px;
    font-style: italic;
    font-weight: 700;
    color: white;
    background: #1DD1A1;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 45px;
    padding: 5px 0px;
  }

</style>

<script>

import { printerStyles, trayStyles } from './Styles.js'

export default {
  methods: {
    // Set a different style for the tray icon depending on the status of the tray.
    trayStyle(tray_status_code){
      switch(tray_status_code){

        case 0: return trayStyles._FULL

        case 1: return trayStyles._LOW

        case 2: return trayStyles._EMPTY

        case 3: return trayStyles._MISSING

      }
    },
    // Set a different icon depending on the status code of the printer.
    statusIcon(){

      let classes = ['fas']

      switch(this.status.statusCode){
       
        case 0: classes.push('fa-check-circle')
        break;

        case 1: classes.push('fa-exclamation-triangle')
        break;

        case 2: classes.push('fa-hand-paper')
        break;

        case 3: classes.push('fa-power-off')
        break;

      }

      return classes
    },
    // Set a different style for the printer depending on the status code of the printer.
    printerStyle(code){
      switch(code){

        case 0: return printerStyles._GOOD

        case 1: return printerStyles._WARNING

        case 2: return printerStyles._EMERGENCY

        case 3: return printerStyles._OFFLINE

        default: return printerStyles._OFFLINE

      }
    },
  },
  props: ['status']
}
</script>