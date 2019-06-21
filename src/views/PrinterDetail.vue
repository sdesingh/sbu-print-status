<template>
  <div id="main"> 

    <div id="nav">
      
      <!-- Left Side. -->
      <!-- Used to navigate between different printers. -->
      <browser-navigator id="navigator" class="pb-2"/>

      <!-- Right Side. -->
      <!-- Shows detailed information about this printer location. -->
      <printer-summary-expanded/>

    </div>

  </div>
</template>

<style scoped>


  #main {
    position: relative;
    padding: 0px;
    margin: 0px;
  }


  #navigator {
    width: 100%;
    overflow: scroll;
  }

  #nav {
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: 1fr;
    height: 100vh;
  }
</style>


<script>
import BrowserNavigator from '../components/BrowserNavigator'
import PrinterSummaryExpanded from '../components/PrinterSummaryExpanded'

export default {
    components: {
      PrinterSummaryExpanded,
      BrowserNavigator,
    }
}
</script>