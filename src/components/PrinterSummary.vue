<template>
  <div id="summary">

    <div id="printer-name"> {{ status.name }} </div>

    <div id="status">

    <div id="paper-status">
      <ul>
        <li v-for="(item, index) in status.trays" :key="index"> {{ `${item.tray} ${item.size} ${item.capacity}` }} </li>
      </ul>
    </div>

    <div id="supplies-status">
      <div id="toner"> Toner Cartridge: {{ status.supplies.toner }} </div>
      <div id="drum"> Drum Cartridge: {{ status.supplies.drum }} </div>
      <div id="maintenance"> Maintenance Kit: {{ status.supplies.maintenance }} </div>
    </div>


    </div>


    

  </div>
</template>

<style scoped>
  #summary {
    /* border: 1px solid grey; */
    
  }

  #status {
    border: 1px solid #e9e9e9;
    padding: 10px 20px;
    /* border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px; */
  }

  #printer-name {
    padding: 10px 20px;
    font-size: 25px;
    font-weight: 600;
    color: white;
    background: #34495e;
  }
</style>

<script>
import Scraper from '../model/scraper.js'

export default {

  data(){
    return {
    }
  },
  methods: {
    
  },
  props: ['status']
}
</script>