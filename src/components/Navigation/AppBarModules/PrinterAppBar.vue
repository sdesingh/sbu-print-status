<template>
  <div id="printer-app-bar" >
    <div id="printer-refresh-status" class="font-weight-bold">Refreshing Data in {{tickerValue}}s ...</div>

   <v-btn icon @click="refreshData">
        <v-icon>mdi-sync</v-icon>
    </v-btn>

    <v-btn icon @click="showPrinterSelect">
        <v-icon>mdi-view-grid-plus</v-icon>
    </v-btn>
    
    <v-btn icon @click="showSettings">
        <v-icon>mdi-settings</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    refreshData(): void {
      this.$store.dispatch('data/fetchData');
      this.$store.commit('data/resetTicker');
    },
    showSettings(): void {
      this.$store.commit('ui/showPrinterSettings', true);
    },
    showPrinterSelect(): void {
      this.$store.commit('ui/showPrinterSelect', true);
    }
  },
  computed: {
    tickerValue(): number {
      return this.$store.state.data.tickerValue;
    }
  },
})
</script>


<style scoped>

  #printer-app-bar {
    display: block;
  }

  #printer-refresh-status {
    float: left;
    line-height: 48px;
    font-size: 15px;
  }



</style>