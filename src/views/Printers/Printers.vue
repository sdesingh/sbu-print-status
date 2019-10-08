<template>
  <v-container fluid>

    <div style="display: block">
      <h2>Print Stats</h2>

      <v-btn class="mx-2" fab dark small color="primary" @click="fetch">
        <v-icon dark>mdi-cached</v-icon>
      </v-btn>
    </div>

    <printer-grid :data="printerData" :isLoading="isLoadingData"/>


  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PrinterGrid from './components/PrinterGrid.vue';
import Printer from '@/model/Printer/Printer';

export default Vue.extend({
  components: {
    PrinterGrid
  },
  methods: {
    fetch() {
      this.$store.dispatch('data/fetchData')
    }
  },
  computed: {
    printerData(): Printer[] {
      return this.$store.state.data.printers;
    },
    isLoadingData(): boolean {
      return this.$store.state.data.loadingData;
    }
  }
})
</script>

<style scoped>



</style>