<template>
  <div id="summary">


    <div id="title-bar" :style="printerStyle.titlebar"> 
      {{ status.name}} 
    </div>

    <div id="status" v-if="status.trays.length != 0 || status.statusCode != 3">

      <div id="paper-status">
          <div class="tray" v-for="(tray, index) in status.trays" :key="index"> 
            <div id="tray-name"> {{ tray.tray }} </div>
            <div id="tray-size"> {{ tray.size }} </div>
            <div id="tray-capacity" :style="trayStyle(tray.statusCode)"> {{ tray.capacity.toUpperCase() }} </div>
          </div>
      </div>

      <div id="supplies-status">
        <div class="supply" id="toner"> Toner </div>
        <div class="supply" id="drum"> Drum </div>
        <div class="supply" id="maintenance"> Kit </div>
      </div>

    </div>

  </div>
</template>

<style scoped>

  #summary {
    /* border: 1px solid grey; */
    transition: 0.1s linear;
  }

  #status-icon {
    width: 30px;
    height: 30px;
  }

  #status {
    font-family: 'Open Sans', sans-serif;
    border: 1px solid #e9e9e9;
    background: white;
    padding: 10px 20px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: 60% 40%;
  }

  #paper-status {
    display: grid;
    line-height: 30px;
    grid-gap: 10px;
    grid-auto-rows: 30px;
    grid-auto-columns: 1fr;
  }

  #supplies-status {
    display: grid;
    grid-auto-rows: 30px;
    grid-gap: 10px;
    text-align: right;
  }

  #title-bar {
    padding: 10px 0px;
    padding-left: 20px;
    font-family: 'Google Sans';
    font-size: 30px;
    font-weight: 600;
    color: white;
    background: #34495e;
  }

  #tray-capacity {
    font-family: 'Open Sans', sans-serif;
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
    font-family: 'Open Sans', sans-serif;
    font-size: 15px;
    font-style: italic;
    font-weight: 700;
    color: white;
    background: #1DD1A1;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 45px;
  }

</style>

<script>

import { settings } from '../model/printerSettings.js'
import { printerStyles, trayStyles } from './Styles.js'


export default {
  data(){
    return {
    }
  },
  methods: {
    trayStyle(tray_status_code){
      switch(tray_status_code){

        case 0: return trayStyles._FULL

        case 1: return trayStyles._LOW

        case 2: return trayStyles._EMPTY

        case 3: return trayStyles._MISSING

      }
    },
    statusIcon(){
      const prefix = '../assets/status_icons/'

      switch(this.status.statusCode){
        case 0: return require(prefix + 'check.svg')
        case 1: return require(prefix + 'warning.svg')
        case 2: return require(prefix + 'stop.svg')
        case 3: return require(prefix + 'offline.svg')
        default: return require(prefix + 'offline.svg')
      }
    }
  },
  computed: {
    printerStyle(){
      switch(this.status.statusCode){

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