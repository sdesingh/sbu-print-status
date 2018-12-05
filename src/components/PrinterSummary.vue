<template>
  <div id="summary">

    <h2>West E Commons</h2>

    <div id="paper-status">
      <ul>
        <li v-for="(item, index) in status.trays" :key="index"> {{ item }} </li>
      </ul>
    </div>

    <div id="supplies-status">
      <div id="toner"> {{ status.supplies.toner }} </div>
      <div id="drum"> {{ status.supplies.drum }} </div>
      <div id="maintenance"> {{ status.supplies.drum }} </div>
    </div>

    

  </div>
</template>

<style scoped>
  #summary {
    border: 1px solid grey;
    padding: 15px;
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