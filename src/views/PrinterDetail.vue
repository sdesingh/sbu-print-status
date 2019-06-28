<template>
  <div id="main"> 

    <div id="nav">
      
      <!-- Left Side. -->
      <!-- Used to navigate between different printers. -->
      <browser-navigator id="navigator" class="pb-2"/>

      <!-- Right Side. -->
      <!-- Shows detailed information about this printer location. -->
      <printer-summary-expanded id="printer-detail"/>

    </div>

  </div>
</template>

<style scoped>

  #navigator {
    width: 100%;
    overflow: scroll;
  }


  #nav {
    padding-top: 20px;
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: 1fr;
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