<template>
  <div id="printer-app-bar" >
    <div id="printer-refresh-status" class="font-weight-bold mx-1">Refreshing Data in {{tickerValue}}s ...</div>
    <v-btn icon @click="showSettings">
        <v-icon>mdi-settings</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    showSettings(): void {
      this.$store.commit('ui/showPrinterSettings', true);
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
  }



</style>