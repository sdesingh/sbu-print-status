<template>
  <v-container fluid>

    <div style="display: block">
      <h2>Print Stats</h2>

      <v-btn class="mx-2" fab dark small color="primary" @click="fetch">
        <v-icon dark>mdi-cached</v-icon>
      </v-btn>

      <v-btn class="mx-2" fab dark small color="primary" @click="showSettings">
        <v-icon dark>mdi-view-grid-plus</v-icon>
      </v-btn>

    </div>

    <v-dialog v-model="showPrinterSelect" max-width="500px">
      <printer-select/>
    </v-dialog>

    <printer-grid :data="printerData" :isLoading="isLoadingData"/>


  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import PrinterGrid from './components/PrinterGrid.vue';
import PrinterSelect from './components/PrinterSelect.vue';
import Printer from '@/model/Printer/Printer';

export default Vue.extend({
  components: {
    PrinterGrid,
    PrinterSelect,
  },
  methods: {
    fetch(): void {
      this.$store.dispatch('data/fetchData')
    },
    showSettings(): void {
      this.showPrinterSelect = true;
    },
  },
  computed: {
    printerData(): Printer[] {
      return this.$store.state.data.printers;
    },
    isLoadingData(): boolean {
      return this.$store.state.data.loadingData;
    }
  },
  data() {
    return {
      showPrinterSelect: false,
    }
  }
})
</script>

<style scoped>



</style>