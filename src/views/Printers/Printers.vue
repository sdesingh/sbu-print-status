<template>
  <v-container fluid>

    <div style="display: block">
      <h2>Print Stats</h2>

      <v-btn class="mx-2" fab dark small color="primary">
        <v-icon dark>mdi-cached</v-icon>
      </v-btn>
    </div>

    <printer-grid/>


  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PrinterGrid from './components/PrinterGrid.vue';

export default Vue.extend({
  components: {
    PrinterGrid
  }
})
</script>

<style scoped>



</style>